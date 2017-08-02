export interface Literalsi18n {

    calendar?: {
            firstDayOfWeek: number;
            dayNames: string[];
            dayNamesMin: string[];
            monthNames: string[];
            monthNamesShort: string[];
        },
    messages?: {
        success: {
            contact_creation: string;
            contact_delete: string;
            contact_update: string;
        },
        error: {
            general_error: string;
            creation_error: string;
            
        }
    },
    modals?: {
        delete_confirmation: {
            confirm_delete: string;
            ask_delete: string;
            reject_button: string;
            accept_button: string;
        },
        loading: string;
    },
    language_list?: {
        language_english: string;
        language_spanish: string;
    }
}