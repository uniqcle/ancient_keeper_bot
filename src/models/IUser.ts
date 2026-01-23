import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    t_id: number;
    first_name: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        t_id: {
            type: Number,
            required: [true, "Telegram ID is required"],
            unique: true,
        },
        first_name: { type: String },
        username: { type: String },
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>("User", UserSchema);
