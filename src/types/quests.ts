interface IItem {
    id: string;
    img: string;
    title: string;
    info?: string;
}

type questsDataType = Record<string, IItem>;

export { IItem, questsDataType };