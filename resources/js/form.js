import app from './app';

const form = {
    note: (message, duration) => {
        return app.$notify({
            group: 'notes',
            text: message,
            duration: duration,
        });
    },
    fail: () => {
        return app.$notify({
            group: 'notes',
            text: 'Something went wrong while processing your request!',
            duration: 10000,
        });
    },
    errors: (err) => {
        if(err.response.status === 422) {
            return err.response.data.errors;
        }
    },
};

export default form;
