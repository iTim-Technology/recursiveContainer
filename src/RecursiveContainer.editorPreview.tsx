import { createElement, ReactElement, ComponentType, ReactNode } from "react";
import { RecursiveContainerPreviewProps } from "../typings/RecursiveContainerProps";

export function preview({
    content,
    childDataSource,
    childContent
}: RecursiveContainerPreviewProps): ReactElement {
    const ContentRenderer = content.renderer as ComponentType<{ children: ReactNode }>;
    const ChildContentRenderer = childContent.renderer as ComponentType<{ children: ReactNode }>;

    return (
        <div
            style={{
                border: "2px dashed #a0a0a0",
                borderRadius: 4,
                padding: 8,
                background: "#f9f9f9"
            }}
        >
            <div
                style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "#666",
                    marginBottom: 4
                }}
            >
                🔁 Recursive Container — Content
            </div>

            {/* Current node content drop zone */}
            <ContentRenderer>
                <div style={{ minHeight: 24, color: "#999", fontSize: 11 }}>
                    Drop content here (context: current node)
                </div>
            </ContentRenderer>

            {/* Child section */}
            {childDataSource && (
                <div
                    style={{
                        marginTop: 8,
                        border: "1px dashed #c0c0c0",
                        borderRadius: 3,
                        padding: 6,
                        background: "#f0f0f0"
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: "bold",
                            color: "#888",
                            marginBottom: 4
                        }}
                    >
                        ↳ Child node (via association)
                    </div>
                    <ChildContentRenderer>
                        <div style={{ minHeight: 24, color: "#aaa", fontSize: 11 }}>
                            Drop a Recursive Container here for the child node
                        </div>
                    </ChildContentRenderer>
                </div>
            )}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/RecursiveContainer.css");
}
