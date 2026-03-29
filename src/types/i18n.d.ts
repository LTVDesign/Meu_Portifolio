declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: {
                hero: {
                    title: string;
                    titleMeta: string;
                    descriptionMeta: string;
                    subtitle: string[];
                };
                contact: {
                    p: string;
                    h2: string;
                    form: {
                        name: { span: string };
                        email: { span: string };
                        phone: { span: string };
                        company: { span: string };
                        message: { span: string };
                    };
                    sending: string;
                    submit: string;
                    validationErrors: {
                        correctForm: string;
                    };
                };
                courses: {
                    allTitle: string;
                };
            };
        };
    }
}