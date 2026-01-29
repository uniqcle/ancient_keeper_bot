type NextButtonsType = {
    next: string;
    text: string;
};
type OptionButtonsType = {
    option: string;
    text: string;
};

type FeedbackType = Record<
    "success" | "failure",
    { img: string; text: string; next: string }
>;

type StageType = {
    id: number;
    img: string;
    text: string;
    nextButtons?: NextButtonsType[];
    optionButtons?: OptionButtonsType[];
    correct_answer?: string;
    feedback?: FeedbackType;
};

type TombStagesType = Record<string, StageType>;

interface ITombData {
    name: string;
    info_img: string;
    info_text: string;
    description: string;
    level: string;
    score: number;
    title: string;
    trophy: string;
    stages: TombStagesType;
}

export { ITombData, StageType, OptionButtonsType, NextButtonsType };
