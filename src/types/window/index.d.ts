import {Catalog} from "@lingui/core";

declare global {
    interface Window {
        LINGUI_CATALOG: Catalog
    }
}
