interface IItem {
	id: string;
	img: string; 
	title: string;
	info?: string;
}

type questsImgType = Record<string, IItem>

export { IItem, questsImgType };