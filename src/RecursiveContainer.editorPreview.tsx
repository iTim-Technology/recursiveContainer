import { createElement, ReactElement, ComponentType, ReactNode } from "react";
import { RecursiveContainerPreviewProps } from "../typings/RecursiveContainerProps";

export function preview({ content }: RecursiveContainerPreviewProps): ReactElement {
    const ContentRenderer = content.renderer as ComponentType<{ children: ReactNode }>;

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
                    marginBottom: 6
                }}
            >
                🔁 Recursive Container
            </div>
            <div style={{ fontSize: 10, color: "#999", marginBottom: 6 }}>
                Drop widgets here — rendered for every node in the tree
            </div>
            <ContentRenderer>
                <div style={{ minHeight: 32, color: "#bbb", fontSize: 11, fontStyle: "italic" }}>
                    Drop widgets here...
                </div>
            </ContentRenderer>
            {/* Visual hint of recursion */}
            <div
                style={{
                    marginTop: 6,
                    marginLeft: 16,
                    border: "1px dashed #c8c8c8",
                    borderRadius: 3,
                    padding: "4px 8px",
                    color: "#bbb",
                    fontSize: 10
                }}
            >
                ↳ children rendered here automatically
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/RecursiveContainer.css");
}
