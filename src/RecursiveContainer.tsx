import { createElement, ReactElement, createContext, useContext } from "react";
import { RecursiveContainerContainerProps } from "../typings/RecursiveContainerProps";
import "./ui/RecursiveContainer.css";

/**
 * Context that carries the current recursion depth so child instances
 * can detect how deep they already are without needing an explicit prop.
 */
const DepthContext = createContext<number>(0);

export function RecursiveContainer({
    class: className,
    style,
    content,
    childDataSource,
    childContent,
    maxDepth
}: RecursiveContainerContainerProps): ReactElement {
    const currentDepth = useContext(DepthContext);

    // --- Determine whether a child object is available ---
    // childDataSource is a ListValue: it has .items (ObjectItem[]) when available
    const childItems =
        childDataSource?.status === "available" ? childDataSource.items ?? [] : [];
    const hasChild = childItems.length > 0;

    // --- Safety guard: stop if max depth reached ---
    const depthLimitReached = currentDepth >= maxDepth;

    return (
        <DepthContext.Provider value={currentDepth + 1}>
            <div className={`recursive-container ${className ?? ""}`.trim()} style={style}>
                {/* ── Current node content ── */}
                {content}

                {/* ── Child node(s) ── */}
                {hasChild && !depthLimitReached && childContent && (
                    <div className="recursive-container__child">
                        {childItems.map(item => (
                            <div key={item.id}>
                                {childContent.get(item)}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Dev warning when depth limit is hit ── */}
                {hasChild && depthLimitReached && (
                    <div className="recursive-container__depth-warning">
                        ⚠ Recursive Container: max depth of {maxDepth} reached.
                    </div>
                )}
            </div>
        </DepthContext.Provider>
    );
}
