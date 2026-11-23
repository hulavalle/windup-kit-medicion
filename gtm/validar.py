"""Valida los contenedores de GTM del kit contra la especificación y su matriz.

Archivos:
- fandango-inicio.json y fandango-solucion.json (web demo de Café Fandango, plan/matriz.csv).
- wp-tags-base.json (WordPress + GTM4WP, punto de partida del alumno).
- wp-solucion-ecommerce.json (WooCommerce, filas de plan/matriz.csv que GTM4WP puede producir).
- wp-solucion-leadgen.json (clínica dental, plan/ejemplos/matriz-clinica-dental.csv).

Uso, desde la raíz del repositorio: python3 gtm/validar.py gtm/<proyecto>.json
Con un archivo de otro nombre (tu proyecto) solo comprueba la estructura.
Sin argumentos comprueba los cinco del kit contra su matriz (plan/matriz.csv es la de Café Fandango).
Sale con código 1 si algo falla.
"""
import csv
import json
import re
import sys
from pathlib import Path

GTM_DIR = Path(__file__).resolve().parent
MATRIZ = GTM_DIR.parent / "plan" / "matriz.csv"
MATRIZ_DENTAL = GTM_DIR.parent / "plan" / "ejemplos" / "matriz-clinica-dental.csv"

# Activadores integrados de GTM que no aparecen en la lista "trigger" de una exportación.
BUILTIN_TRIGGERS = {
    "2147479553": "All Pages",
    "2147479572": "Consent Initialization - All Pages",
    "2147479573": "Initialization - All Pages",
}
# Variables internas que GTM acepta sin declararlas ({{_event}} en los activadores de evento personalizado).
INTERNAL_VARIABLES = {"_event"}

# Variables integradas de la especificación (sin vídeo: el temporizador sustituye a YouTube).
FANDANGO_BUILTINS = [
    "Page URL", "Page Path", "Page Hostname", "Referrer", "Event", "Click Element", "Click ID",
    "Click Classes", "Click Text", "Click URL", "Form ID", "Form Element", "Form Classes",
    "Scroll Depth Threshold", "Scroll Direction",
]
# La base de WordPress añade las de vídeo para los Media events de GTM4WP.
WP_BUILTINS = FANDANGO_BUILTINS + ["Video Title", "Video Percent", "Video Status", "Video URL"]
FANDANGO_VARIABLES = [
    "Const - GA4 ID", "dlv - ecommerce.value", "dlv - ecommerce.currency",
    "dlv - ecommerce.transaction_id", "dlv - ecommerce.items",
]
# Claves que empuja GTM4WP (WooCommerce y Contact Form 7), ver ../gtm4wp.md.
WP_VARIABLES = [
    "Const - GA4 ID", "dlv - ecommerce.value", "dlv - ecommerce.currency",
    "dlv - ecommerce.transaction_id", "dlv - ecommerce.items", "dlv - formid", "dlv - formname",
]
ECOMMERCE_KEYS = {"item_list_name", "items", "currency", "value", "transaction_id"}


def ce(event, *extra):
    return ("CUSTOM_EVENT", [("EQUALS", "{{_event}}", event), *extra])


def timer(path):
    return ("TIMER", [("CONTAINS", "{{Page Path}}", path)])


SCROLL_GUIA = ("SCROLL_DEPTH", [("CONTAINS", "{{Page Path}}", "/guia")])
CTA_HERO = ("CLICK", [("EQUALS", "{{Click ID}}", "cta-suscribirme-hero")])
ECOM_TRIGGERS = {ev: (f"CE - {ev}", *ce(ev))
                 for ev in ["view_item_list", "view_item", "add_to_cart", "begin_checkout", "purchase"]}

# Por archivo: matriz, activador esperado por evento (nombre, tipo, condiciones obligatorias),
# eventos de la matriz que el archivo no cubre y parámetros de la matriz que no se envían.
SOLUTIONS = {
    "fandango-solucion.json": {
        "matriz": MATRIZ, "variables": FANDANGO_VARIABLES, "builtins": FANDANGO_BUILTINS,
        "triggers": {
            **ECOM_TRIGGERS,
            "page_read": ("Scroll - 75 % guía", *SCROLL_GUIA),
            "timer_5s": ("Timer - 5 s ficha", *timer("/producto")),
            "cta_click": ("Clic - CTA suscribirme hero", *CTA_HERO),
            "generate_lead": ("Form - B2B", "FORM_SUBMISSION", [("EQUALS", "{{Form ID}}", "form-b2b")]),
        },
        "skip_events": set(), "unsent_params": set(),
    },
    # El lead B2B va en la solución de captación.
    "wp-solucion-ecommerce.json": {
        "matriz": MATRIZ, "variables": WP_VARIABLES, "builtins": WP_BUILTINS,
        "triggers": {
            **ECOM_TRIGGERS,
            "page_read": ("Scroll - 75 % guía", *SCROLL_GUIA),
            "timer_5s": ("Timer - 5 s", *timer("/producto/")),
            "cta_click": ("Clic - CTA suscribirme hero", *CTA_HERO),
        },
        "skip_events": {"generate_lead"}, "unsent_params": set(),
    },
    "wp-solucion-leadgen.json": {
        "matriz": MATRIZ_DENTAL, "variables": WP_VARIABLES, "builtins": WP_BUILTINS,
        "triggers": {
            "cta_click": ("Clic - Pedir cita", "LINK_CLICK", [("CONTAINS", "{{Click URL}}", "/pedir-cita")]),
            "page_read": ("Scroll - 75 % implantes", "SCROLL_DEPTH",
                          [("CONTAINS", "{{Page Path}}", "/tratamientos/implantes")]),
            "timer_5s": ("Timer - 5 s", *timer("/tratamientos/")),
            "generate_lead": ("CE - CF7 Pedir cita",
                              *ce("gtm4wp.contactForm7MailSent", ("EQUALS", "{{dlv - formname}}", "Pedir cita"))),
            "phone_click": ("Clic - Teléfono", "LINK_CLICK", [("STARTS_WITH", "{{Click URL}}", "tel:")]),
            "whatsapp_click": ("Clic - WhatsApp", "LINK_CLICK",
                               [("MATCH_REGEX", "{{Click URL}}", r"wa\.me|api\.whatsapp\.com")]),
        },
        "skip_events": set(), "unsent_params": set(),
    },
}
STARTERS = {
    "fandango-inicio.json": {"variables": FANDANGO_VARIABLES, "builtins": FANDANGO_BUILTINS},
    "wp-tags-base.json": {"variables": WP_VARIABLES, "builtins": WP_BUILTINS},
}
DEFAULT_FILES = ["fandango-inicio.json", "fandango-solucion.json", "wp-tags-base.json",
                 "wp-solucion-ecommerce.json", "wp-solucion-leadgen.json"]

REF = re.compile(r"\{\{([^{}]+)\}\}")


def strings(node):
    if isinstance(node, dict):
        for v in node.values():
            yield from strings(v)
    elif isinstance(node, list):
        for v in node:
            yield from strings(v)
    elif isinstance(node, str):
        yield node


def params(entity):
    return {p["key"]: p for p in entity.get("parameter", [])}


def conditions(trigger):
    """Todas las condiciones del activador como (operador, arg0, arg1)."""
    out = set()
    for key in ("customEventFilter", "filter", "autoEventFilter"):
        for c in trigger.get(key, []):
            args = {p.get("key"): p.get("value") for p in c.get("parameter", [])}
            out.add((c.get("type"), args.get("arg0"), args.get("arg1")))
    return out


def check(path, errors, required_variables=(), required_builtins=(), exact_builtins=False):
    def err(msg):
        errors.append(f"{path.name}: {msg}")

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        err(f"JSON no válido ({exc})")
        return None

    if data.get("exportFormatVersion") != 2:
        err("exportFormatVersion debe ser 2")
    cv = data.get("containerVersion", {})
    tags, triggers = cv.get("tag", []), cv.get("trigger", [])
    variables, builtins = cv.get("variable", []), cv.get("builtInVariable", [])

    for kind, items, key in [("tag", tags, "tagId"), ("trigger", triggers, "triggerId"),
                             ("variable", variables, "variableId")]:
        ids = [i.get(key) for i in items]
        names = [i.get("name") for i in items]
        for label, values in [(key, ids), ("name", names)]:
            dupes = sorted({v for v in values if values.count(v) > 1})
            if dupes:
                err(f"{kind}: {label} duplicado {dupes}")
        if any(not v for v in ids):
            err(f"{kind}: falta {key}")
    bi_types = [b["type"] for b in builtins]
    if len(bi_types) != len(set(bi_types)):
        err("builtInVariable duplicada")

    trigger_ids = {tr["triggerId"] for tr in triggers} | set(BUILTIN_TRIGGERS)
    for tag in tags:
        if not tag.get("firingTriggerId"):
            err(f"etiqueta {tag['name']!r} sin activador")
        for tid in tag.get("firingTriggerId", []) + tag.get("blockingTriggerId", []):
            if tid not in trigger_ids:
                err(f"etiqueta {tag['name']!r}: activador {tid} no existe")

    known_vars = {v["name"] for v in variables} | {b["name"] for b in builtins} | INTERNAL_VARIABLES
    for entity in tags + triggers + variables:
        for s in strings(entity):
            for ref in REF.findall(s):
                if ref not in known_vars:
                    err(f"{entity['name']!r}: {{{{{ref}}}}} no es una variable definida ni integrada activada")

    # Nunca se lee la lista de campos de Contact Form 7 (datos personales del formulario).
    for v in variables:
        if v.get("type") == "v" and params(v).get("name", {}).get("value", "").split(".")[0] == "inputs":
            err(f"{v['name']!r}: no leas 'inputs' del dataLayer, lleva lo que escribe el usuario")

    bi_names = {b["name"] for b in builtins}
    for name in required_builtins:
        if name not in bi_names:
            err(f"falta la variable integrada {name!r}")
    if exact_builtins:
        extra = sorted(bi_names - set(required_builtins))
        if extra:
            err(f"variables integradas que la especificación no pide: {extra}")
    var_names = {v["name"] for v in variables}
    for name in required_variables:
        if name not in var_names:
            err(f"falta la variable {name!r}")
    ga4_id = next((v for v in variables if v["name"] == "Const - GA4 ID"), None)
    if ga4_id and (ga4_id["type"] != "c" or params(ga4_id)["value"]["value"] != "G-XXXXXXXXXX"):
        err("Const - GA4 ID debe ser una constante con valor G-XXXXXXXXXX")
    gtag = next((t for t in tags if t["name"] == "GA4 - Google tag"), None)
    if not gtag or gtag["type"] != "googtag" or gtag["firingTriggerId"] != ["2147479573"] \
            or params(gtag)["tagId"]["value"] != "{{Const - GA4 ID}}":
        err("GA4 - Google tag debe ser googtag con {{Const - GA4 ID}} en Initialization - All Pages")
    return cv


def check_timer(trigger, path_regex_or_contains, where, errors):
    """Temporizador: gtm.timer, 5000 ms, límite 1, condición de página en autoEventFilter, sin filtro de disparo."""
    autofilter = trigger.get("autoEventFilter", [])
    args = [p.get("value") for p in autofilter[0].get("parameter", [])] if len(autofilter) == 1 else []
    if trigger.get("type") != "TIMER" \
            or trigger.get("eventName", {}).get("value") != "gtm.timer" \
            or trigger.get("interval", {}).get("value") != "5000" \
            or trigger.get("limit", {}).get("value") != "1" \
            or trigger.get("filter") \
            or (autofilter[0].get("type") if autofilter else None, *args[:2]) != path_regex_or_contains:
        op, arg0, arg1 = path_regex_or_contains
        errors.append(f"{where}: {trigger.get('name')!r} debe ser TIMER gtm.timer, 5000 ms, límite 1, "
                      f"habilitado cuando {arg0} {op} {arg1!r}")


def check_starter(cv, path, errors):
    """Puntos de partida: solo la Google tag. La base de WordPress trae además el activador Timer - 5 s."""
    where = path.name
    if len(cv.get("tag", [])) != 1:
        errors.append(f"{where}: el punto de partida solo lleva GA4 - Google tag, sin etiquetas de evento")
    triggers = cv.get("trigger", [])
    if path.name == "fandango-inicio.json":
        if triggers:
            errors.append(f"{where}: el inicio no lleva activadores")
        return
    if [tr.get("name") for tr in triggers] != ["Timer - 5 s"]:
        errors.append(f"{where}: el único activador debe ser 'Timer - 5 s'")
        return
    check_timer(triggers[0], ("MATCH_REGEX", "{{Page Path}}", ".*"), where, errors)


def check_solution(cv, path, conf, errors):
    tags = {t["name"]: t for t in cv.get("tag", [])}
    triggers = {tr["name"]: tr for tr in cv.get("trigger", [])}
    trig_name = {tr["triggerId"]: tr["name"] for tr in cv.get("trigger", [])}
    with conf["matriz"].open(encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    covered = 0
    for row in rows:
        ev = row["evento_ga4"]
        where = f"{path.name}: {conf['matriz'].name} fila {row['id']} ({ev})"
        if ev in conf["skip_events"]:
            continue
        covered += 1
        tag_name = f"GA4 - evento - {ev}"
        if ev not in conf["triggers"]:
            errors.append(f"{where}: evento sin activador conocido en validar.py")
            continue
        trigger, ttype, conds = conf["triggers"][ev]
        tag = tags.get(tag_name)
        if tag is None:
            errors.append(f"{where}: falta la etiqueta {tag_name!r}")
            continue
        if trigger not in triggers:
            errors.append(f"{where}: falta el activador {trigger!r}")
            continue
        if [trig_name.get(i) for i in tag["firingTriggerId"]] != [trigger]:
            errors.append(f"{where}: {tag_name!r} no se activa con {trigger!r}")
        tr = triggers[trigger]
        if ttype == "TIMER":
            check_timer(tr, conds[0], where, errors)
        else:
            if tr.get("type") != ttype:
                errors.append(f"{where}: {trigger!r} debe ser de tipo {ttype}, es {tr.get('type')}")
            for op, arg0, arg1 in sorted(set(conds) - conditions(tr)):
                errors.append(f"{where}: {trigger!r} necesita la condición {arg0} {op} {arg1!r}")
        p = params(tag)
        if tag["type"] != "gaawe" or p.get("eventName", {}).get("value") != ev:
            errors.append(f"{where}: {tag_name!r} debe ser gaawe con eventName {ev}")
        # Parámetros de la matriz que no salen del objeto ecommerce: key=valor fijo o clave suelta.
        sent = {m["map"][0]["value"]: m["map"][1]["value"]
                for m in p.get("eventSettingsTable", {}).get("list", [])}
        ecommerce = p.get("sendEcommerceData", {}).get("value") == "true"
        for raw in row["parametros"].split(","):
            key, _, fixed = raw.strip().partition("=")
            if ecommerce and key in ECOMMERCE_KEYS:
                continue
            if key in conf["unsent_params"]:
                if key in sent:
                    errors.append(f"{where}: {tag_name!r} envía {key}, que este contenedor no puede rellenar")
                continue
            if key not in sent:
                errors.append(f"{where}: {tag_name!r} no envía el parámetro {key}")
            elif fixed and sent[key] != fixed:
                errors.append(f"{where}: {key} debe valer {fixed!r}, vale {sent[key]!r}")
    # Una etiqueta de evento por evento de la matriz, ni más ni menos.
    expected = {f"GA4 - evento - {r['evento_ga4']}" for r in rows if r["evento_ga4"] not in conf["skip_events"]}
    extra = sorted(set(tags) - expected - {"GA4 - Google tag"})
    if extra:
        errors.append(f"{path.name}: etiquetas que no salen de la matriz: {extra}")
    return covered, len(rows)


def main():
    files = [Path(a).resolve() for a in sys.argv[1:]] or [GTM_DIR / f for f in DEFAULT_FILES]
    errors, report = [], []
    for path in files:
        conf = SOLUTIONS.get(path.name) or STARTERS.get(path.name)
        if conf is None:
            if check(path, errors) is not None:
                report.append(f"{path.name} estructura válida (sin matriz asociada en validar.py)")
            continue
        cv = check(path, errors, conf["variables"], conf["builtins"],
                   exact_builtins=conf["builtins"] is FANDANGO_BUILTINS)
        if cv is None:
            continue
        if path.name in STARTERS:
            check_starter(cv, path, errors)
            report.append(f"{path.name} válido")
        else:
            covered, total = check_solution(cv, path, conf, errors)
            skipped = f", {total - covered} fuera de alcance" if covered != total else ""
            report.append(f"{path.name} válido, {covered} de {total} filas de {conf['matriz'].name} cubiertas{skipped}")
    if errors:
        print("\n".join(f"FALLO {e}" for e in errors))
        sys.exit(1)
    print("OK:\n" + "\n".join(f"  {r}" for r in report))


if __name__ == "__main__":
    main()
