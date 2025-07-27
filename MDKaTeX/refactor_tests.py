import re
from collections import defaultdict
import HTMLandCSS
from difflib import unified_diff

# Simulated JS blocks (replace with actual content of HTML templates if needed)
templates = {
    "front": HTMLandCSS.front,
    "back": HTMLandCSS.back,
    "front_cloze": HTMLandCSS.front_cloze,
    "back_cloze": HTMLandCSS.back_cloze,
}

# Extract function definitions
function_pattern = re.compile(r"function (\w+)\s*\([^)]*\)\s*{[\s\S]*?}\n?")

functions_by_name = defaultdict(dict)

for name, content in templates.items():
    matches = function_pattern.findall(content)
    for match in re.finditer(function_pattern, content):
        func_name = match.group(1)
        func_body = match.group(0).strip()
        functions_by_name[func_name][name] = func_body

# Compare all versions of each function
for func, sources in functions_by_name.items():
    versions = list(sources.values())
    first = versions[0]
    print(f"\nChecking function: {func}")
    if all(v == first for v in versions):
        print("✅ All versions match.")
    else:
        print("❌ Differences detected:")
        base_name = list(sources.keys())[0]
        base_code = sources[base_name].splitlines(keepends=True)
        for name, code in sources.items():
            if name == base_name:
                continue
            comp_code = code.splitlines(keepends=True)
            diff = unified_diff(base_code, comp_code, fromfile=base_name, tofile=name)
            print(f"--- Diff between {base_name} and {name} ---")
            print("".join(diff))
