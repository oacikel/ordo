export type FilterType = 'All' | 'Open' | 'Closed'

export interface IFile {
    id: string
    mandatoryInput: string
    status: FileStatusType
    type: string
    numericInput1?: number
    textInput1?: string
    textInput2?: string
    textInput3?: string
    numericInput2?: number
    dateInput?: Date
}

export type FileStatusType = 'Open' | 'Closed'
export type FileType = 'X' | 'Y'