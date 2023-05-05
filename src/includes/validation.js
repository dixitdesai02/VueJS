import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, min, max, url, numeric, min_value, max_value } from "@vee-validate/rules";

export default {
    install(app) {
        app.component('Form', Form)
        app.component('Field', Field)
        app.component('ErrorMessage', ErrorMessage)

        defineRule('required', required)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('url', url)
        defineRule('numeric', numeric)
        defineRule('min_value', min_value)
        defineRule('max_value', max_value)

        configure({
            generateMessage: (ctx) => {

                const field = ctx.field;

                const messages = {
                    required: `${field.charAt(0).toUpperCase() + field.slice(1)} can not be empty`,
                    min: `${field.charAt(0).toUpperCase() + field.slice(1)} must be of atleast ${ctx.rule.params} characters`,
                    max: `${field.charAt(0).toUpperCase() + field.slice(1)} should not contain more than ${ctx.rule.params} characters`,
                    url: `Please enter a valid URL`,
                    numeric: `${field.charAt(0).toUpperCase() + field.slice(1)} must be numeric`,
                    min_value: `${field.charAt(0).toUpperCase() + field.slice(1)} value is too low`,
                    max_value: `${field.charAt(0).toUpperCase() + field.slice(1)} value is too high`
                }

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `Invalid ${field.charAt(0).toUpperCase() + field.slice(1)}`;

                return message;
            }
        })
    }
}