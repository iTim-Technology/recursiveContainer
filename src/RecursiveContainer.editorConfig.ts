import { RecursiveContainerPreviewProps } from "../typings/RecursiveContainerProps";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[];
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[];
};

export type Problem = {
    property?: string;
    severity?: "error" | "warning" | "deprecation";
    message: string;
    studioMessage?: string;
    url?: string;
    studioUrl?: string;
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number;
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string;
    data?: string;
    property?: object;
    width?: number;
    height?: number;
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    backgroundColor?: string;
    borderWidth?: number;
    padding?: number;
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow";
};

type TextProps = BaseProps & {
    type: "Text";
    content: string;
    fontSize?: number;
    fontColor?: string;
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object;
    placeholder: string;
    showDataSourceHeader?: boolean;
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object;
    child: PreviewProps;
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null;
    child?: PreviewProps;
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(
    _values: RecursiveContainerPreviewProps,
    defaultProperties: Properties
): Properties {
    return defaultProperties;
}

export function check(values: RecursiveContainerPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.maxDepth !== null && values.maxDepth < 1) {
        errors.push({
            property: "maxDepth",
            severity: "error",
            message: "Max depth must be at least 1."
        });
    }

    if (values.maxDepth !== null && values.maxDepth > 100) {
        errors.push({
            property: "maxDepth",
            severity: "warning",
            message: "Max depth is set very high (> 100). This may cause performance issues."
        });
    }

    return errors;
}

export function getPreview(
    values: RecursiveContainerPreviewProps,
    isDarkMode: boolean
): PreviewProps {
    return {
        type: "Container",
        borders: true,
        borderRadius: 4,
        backgroundColor: isDarkMode ? "#2a2a2a" : "#f5f5f5",
        padding: 8,
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Text",
                        content: "Recursive Container",
                        bold: true,
                        fontColor: isDarkMode ? "#cccccc" : "#333333"
                    }
                ]
            },
            {
                type: "Datasource",
                property: values.datasource as object | null,
                child: {
                    type: "DropZone",
                    property: values.content as object,
                    placeholder: "Content — drop widgets here (rendered for every node in the tree)"
                }
            },
            {
                type: "Text",
                content: "↳ children are rendered here automatically",
                italic: true,
                fontColor: isDarkMode ? "#888888" : "#aaaaaa"
            }
        ]
    };
}

export function getCustomCaption(
    _values: RecursiveContainerPreviewProps,
    _platform: Platform
): string {
    return "Recursive Container";
}
