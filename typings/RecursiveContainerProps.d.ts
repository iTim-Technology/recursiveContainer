/**
 * This file was generated from RecursiveContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ListValue, ListReferenceValue, ListWidgetValue } from "mendix";

export interface RecursiveContainerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: ListValue;
    content?: ListWidgetValue;
    parentAssociation?: ListReferenceValue;
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
    datasource: {} | { caption: string } | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    parentAssociation: string;
    maxDepth: number | null;
}
