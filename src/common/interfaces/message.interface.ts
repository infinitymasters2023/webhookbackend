export type IMessage = Record<string, string>;

export type IMessageOptionsProperties = Record<string, string | number>;

export interface IMessageOptions {
    readonly customLanguages?: string[];
    readonly properties?: IMessageOptionsProperties;
}

export interface IMessageErrorOptions {
    readonly customLanguages?: string[];
}

export type IMessageSetOptions = Omit<IMessageOptions, 'customLanguages'>;