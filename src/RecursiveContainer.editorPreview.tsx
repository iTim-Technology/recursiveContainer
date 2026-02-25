import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { RecursiveContainerPreviewProps } from "../typings/RecursiveContainerProps";

export function preview({ sampleText }: RecursiveContainerPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/RecursiveContainer.css");
}
