import "bulma/css/bulma.min.css";
import "./index.css";

const textareaLEl = document.getElementById("textareaL") as HTMLTextAreaElement;
const textareaREl = document.getElementById("textareaR") as HTMLTextAreaElement;
const convertLREl = document.getElementById("convertLR") as HTMLAnchorElement;
const convertRLEl = document.getElementById("convertRL") as HTMLAnchorElement;

convertLREl.onclick = () => {
    textareaREl.value = textareaLEl.value.split("\n").map((el) => {
        let overallAge = 0;

        const gaAge = /(?:GA|PCA)(\d+)w/i.exec(el);
        if (gaAge !== null) {
            overallAge += (parseInt(gaAge[1]) - 38) * 7;
            el = el.replace(gaAge[0], "");
        }

        const hAge = /(\d+)h/i.exec(el);
        if (hAge !== null) {
            overallAge += parseInt(hAge[1]) / 24;
            el = el.replace(hAge[0], "");
        }

        const dAge = /(\d+)d/i.exec(el);
        if (dAge !== null) {
            overallAge += parseInt(dAge[1])
            el = el.replace(dAge[0], "");
        }

        const wAge = /(\d+)w/i.exec(el);
        if (wAge !== null) {
            overallAge += parseInt(wAge[1]) * 7;
            el = el.replace(wAge[0], "");
        }

        const mAge = /(\d+)m/i.exec(el);
        if (mAge !== null) {
            overallAge += parseInt(mAge[1]) * 30;
            el = el.replace(mAge[0], "");
        }

        const yAge = /(\d+)y/i.exec(el);
        if (yAge !== null) {
            overallAge += parseInt(yAge[1]) * 365.25;
            el = el.replace(yAge[0], "");
        }

        return overallAge === 0 ? el : overallAge.toString();
    }).join("\n");
};

convertRLEl.onclick = () => {
    textareaLEl.value = textareaREl.value.split("\n").map((el) => {
        let overallAge = parseFloat(el);
        if (isNaN(overallAge)) {
            return el;
        } else if (overallAge < 0) {
            return `GA${(38 + overallAge / 7).toFixed(1)}w`.replace(".0", "");
        } else if (overallAge === 0) {
            return "0d";
        } 
        
        let ageStr = "";

        const yAge = Math.floor(overallAge / 365.25);
        overallAge %= 365.25;
        if (yAge > 0) {
            ageStr += yAge + "y";
        }

        const mAge = Math.floor(overallAge / 30);
        overallAge %= 30;
        if (mAge > 0) {
            ageStr += mAge + "mo";
        }

        const wAge = Math.floor(overallAge / 7);
        overallAge %= 7;
        if (wAge > 0) {
            ageStr += wAge + "w";
        }

        const dAge = Math.floor(overallAge);
        overallAge %= 1;
        if (dAge > 0) {
            ageStr += dAge + "d";
        }

        if (overallAge > 0) {
            ageStr += ((overallAge * 24).toFixed(1) + "h").replace(".0", "");
        }

        return ageStr;
    }).join("\n");
};
