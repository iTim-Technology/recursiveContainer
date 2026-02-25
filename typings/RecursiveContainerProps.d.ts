/**
 * This file was generated from RecursiveContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ListValue, ListWidgetValue } from "mendix";

export interface RecursiveContainerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    childDataSource?: ListValue;
    childContent?: ListWidgetValue;
    maxDepth: number;
}

export interface RecursiveContainerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    childDataSource: {} | { caption: string } | { type: string } | null;
    childContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    maxDepth: number | null;
}
