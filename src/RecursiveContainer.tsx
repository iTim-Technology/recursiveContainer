import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { RecursiveContainerContainerProps } from "../typings/RecursiveContainerProps";

import "./ui/RecursiveContainer.css";

export function RecursiveContainer({ sampleText }: RecursiveContainerContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
