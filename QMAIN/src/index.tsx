import * as React from "react";
import * as ReactDOM from "react-dom";
import {IntlProvider} from 'react-intl';
// import App from "./components/environment/App";
import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

addLocaleData([...locale_en, ...locale_es]);
import AppsWrapper from "./entry";
import "./index.scss";
import registerServiceWorker from "./registerServiceWorker";
import messages_en from "./translations/en.json"
import messages_es from "./translations/es.json"

const messages = {
    'es': messages_es,
    'en': messages_en
}
const language = navigator.language.split(/[-_]/)[0];  // language without region code

ReactDOM.render(<IntlProvider locale={language} messages={messages[language]}><AppsWrapper/></IntlProvider>, document.getElementById("root") as HTMLElement);
registerServiceWorker();
