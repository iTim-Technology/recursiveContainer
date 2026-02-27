# Recursive Container

A Mendix pluggable widget that renders a **hierarchical tree structure** recursively. Define your card or row layout once in Studio Pro — the widget repeats it automatically for every node and its children, no matter how deep the tree goes.

Typical use cases: category trees, org charts, nested menus, folder structures, comment threads.

## Features

- **Define content once** — place any Mendix widgets in the Content drop zone; they are rendered for every node in the tree
- **Client-side tree building** — pass a flat list and a parent association; the widget builds the hierarchy automatically
- **Configurable max depth** — a safety limit prevents runaway recursion in case of circular references in data
- **CSS variable for children spacing** — indent child levels via a single CSS variable, hookable from Atlas Design Properties without writing custom CSS

## Usage

### 1. Add the widget to a page

Place **Recursive Container** on any page. No entity context is required.

### 2. Configure the Data properties

| Property | Description |
|---|---|
| **Nodes** | A list data source containing all nodes in the tree (the full flat list) |
| **Content** | Drop zone — design your card or row layout here; it is rendered once per node |
| **Parent association** | The association that points to each node's parent. This can be a direct self-referencing association (e.g. `Category_Category`) or a path through an intermediate entity (e.g. `Entity_Next/Next/Next_Entity/Entity`). |

The widget builds the tree client-side: nodes whose parent is not in the list (or have no parent) become root nodes.

### 3. Configure the Safety properties

| Property | Default | Description |
|---|---|---|
| **Max depth** | 25 | Maximum recursion depth. A warning is shown in Studio Pro when the value exceeds 100. |

### 4. Style child indentation

The widget exposes the CSS variable `--recursive-container-children-spacing` on its root element. Set it from your app's `design-properties.json` to add indentation per tree level using Atlas Core spacing tokens — no custom CSS required.

**`themesource/<module>/web/design-properties.json`**
```json
{
    "tech.itim.recursivecontainer.RecursiveContainer": [
        {
            "name": "Children spacing",
            "description": "Sets the indentation of each child level using an Atlas Core spacing token.",
            "type": "ToggleButtonGroup",
            "property": "--recursive-container-children-spacing",
            "options": [
                {
                    "name": "S",
                    "variable": "--spacing-small"
                },
                {
                    "name": "M",
                    "variable": "--spacing-medium"
                },
                {
                    "name": "L",
                    "variable": "--spacing-large"
                }
            ]
        }
    ]
}
```

After adding this, a **Children spacing** toggle appears in the Design tab of the widget in Studio Pro. Selecting S/M/L sets `--recursive-container-children-spacing` to the corresponding Atlas spacing token. If nothing is selected the indentation is `0`.

## Issues, suggestions and feature requests

[Open an issue on GitHub](https://github.com/tmisker/recursiveContainer/issues)

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.
