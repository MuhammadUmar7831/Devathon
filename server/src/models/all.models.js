import { Schema, model } from 'mongoose';

// Consumption Model
const consumptionSchema = new Schema({
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    month: { 
        type: String, 
        required: true,
        match: /^(0[1-9]|1[0-2])-(\d{4})$/, // e.g., 01-2023
    },
    units: { 
        type: Number, 
        required: true, 
        min: 0 
    }
});

export const Consumption = model('Consumption', consumptionSchema);

// Rate Model
const rateSchema = new Schema({
    perunit: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    above100: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    above200: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    above300: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    latePayment: { 
        type: Number, 
        required: true, 
        min: 0 
    }
});

export const Rate = model('Rate', rateSchema);

// Bills Model
const billsSchema = new Schema({
    consumption: { 
        type: Schema.Types.ObjectId, 
        ref: 'Consumption', 
        required: true 
    },
    status: { 
        type: String, 
        required: true,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    total: { 
        type: Number, 
        required: true, 
        min: 0 
    }
});

export const Bills = model('Bills', billsSchema);

// Chat Model
const chatSchema = new Schema({
    residentId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    supportId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Chat = model('Chat', chatSchema);

// Message Model
const messageSchema = new Schema({
    content: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 500 // assuming a max length of 500 characters
    },
    chatId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Chat', 
        required: true 
    }
});

export const Message = model('Message', messageSchema);

// Announcement Model
const announcementSchema = new Schema({
    message: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 1000 // assuming max length of 1000 characters
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Announcement = model('Announcement', announcementSchema);

// Events Model
const eventSchema = new Schema({
    type: { 
        type: String, 
        required: true 
    },
    date: {
        start: { 
            type: Date, 
            required: true,
            validate: {
                validator: function (value) {
                    return value < this.date.end; // Start date must be before the end date
                },
                message: 'Start date must be before the end date'
            }
        },
        end: { 
            type: Date, 
            required: true 
        }
    },
    title: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 200 
    }
});

export const Events = model('Events', eventSchema);

// Official Holidays Model
const officialHolidaySchema = new Schema({
    title: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 100 
    },
    date: { 
        type: Date, 
        required: true,
        unique: true // No duplicate holiday dates
    }
});

export const OfficialHoliday = model('OfficialHoliday', officialHolidaySchema);

// Office Timings Model
const officeTimingsSchema = new Schema({
    start: { 
        type: String, 
        required: true, 
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // Time format HH:mm (24-hour clock)
    },
    end: { 
        type: String, 
        required: true, 
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // Time format HH:mm (24-hour clock)
    }
});

export const OfficeTimings = model('OfficeTimings', officeTimingsSchema);

