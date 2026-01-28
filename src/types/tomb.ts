
interface IPage {
	id: number; 
	img: string; 
	text: string; 
	optionButton: IOptions[]; 
}

interface IOptions {
	id: string; 
	text: string; 
}

type FeedbackType = Record<'success' | 'failure', { img: string; text: string, button: string }>
 
type StageType = {
    title: string;
    pages: Array<IPage>;
    correct_answer: string;
    feedback: FeedbackType;
    next: string;
};

type TombStagesType = Record<string, StageType>

interface ITombData {
    title: string;
    info_img?: string;
    info_text?: string;
	description?: string;
	stage: TombStagesType;
}


export { ITombData, StageType, IOptions };