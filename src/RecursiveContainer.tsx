import { createElement, ReactElement, Fragment } from "react";
import { ObjectItem, ListWidgetValue, ListReferenceValue } from "mendix";
import { RecursiveContainerContainerProps } from "../typings/RecursiveContainerProps";
import "./ui/RecursiveContainer.css";

/**
 * Build a map of parentId → children from the flat list of all nodes.
 * Nodes without a parent (or whose parent is not in the list) are root nodes.
 */
function buildChildrenMap(
    items: ObjectItem[],
    parentAssociation: ListReferenceValue
): Map<string | null, ObjectItem[]> {
    const childrenMap = new Map<string | null, ObjectItem[]>();

    for (const item of items) {
        const parentValue = parentAssociation.get(item);
        // parentValue is DynamicValue<ObjectItem> — .value is the parent ObjectItem or undefined
        const parentId = parentValue.value?.id ?? null;

        if (!childrenMap.has(parentId)) {
            childrenMap.set(parentId, []);
        }
        childrenMap.get(parentId)!.push(item);
    }

    return childrenMap;
}

interface TreeLevelProps {
    items: ObjectItem[];
    content: ListWidgetValue;
    childrenMap: Map<string | null, ObjectItem[]>;
    currentDepth: number;
    maxDepth: number;
}

function TreeLevel({ items, content, childrenMap, currentDepth, maxDepth }: TreeLevelProps): ReactElement {
    return (
        <Fragment>
            {items.map(item => {
                const children = childrenMap.get(item.id) ?? [];
                const hasChildren = children.length > 0;
                const depthLimitReached = currentDepth >= maxDepth;

                return (
                    <div key={item.id} className="recursive-container__node">
                        {/* User-defined content for this node */}
                        {content.get(item)}

                        {/* Recurse into children */}
                        {hasChildren && !depthLimitReached && (
                            <div className="recursive-container__children">
                                <TreeLevel
                                    items={children}
                                    content={content}
                                    childrenMap={childrenMap}
                                    currentDepth={currentDepth + 1}
                                    maxDepth={maxDepth}
                                />
                            </div>
                        )}

                        {hasChildren && depthLimitReached && (
                            <div className="recursive-container__depth-warning">
                                ⚠ Max depth of {maxDepth} reached.
                            </div>
                        )}
                    </div>
                );
            })}
        </Fragment>
    );
}

export function RecursiveContainer({
    class: className,
    style,
    datasource,
    content,
    parentAssociation,
    maxDepth
}: RecursiveContainerContainerProps): ReactElement {
    const containerClass = `recursive-container ${className ?? ""}`.trim();

    // Wait for data
    if (datasource.status !== "available" || !content || !parentAssociation) {
        return <div className={containerClass} style={style} />;
    }

    const allItems = datasource.items ?? [];

    // Build the tree client-side from the flat list using the parent association
    const childrenMap = buildChildrenMap(allItems, parentAssociation);

    // Root nodes are those whose parent is null (no parent, or parent not in dataset)
    const rootItems = childrenMap.get(null) ?? [];

    return (
        <div className={containerClass} style={style}>
            <TreeLevel
                items={rootItems}
                content={content}
                childrenMap={childrenMap}
                currentDepth={0}
                maxDepth={maxDepth}
            />
        </div>
    );
}
