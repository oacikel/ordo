import { IFile } from "app/types"

export const validateFile = (file: IFile): (keyof IFile)[] => {
    let missingMandatoryFields: (keyof IFile)[] = []
    if (!file.mandatoryInput) {
        missingMandatoryFields.push('mandatoryInput')
    }
    if (!file.status) {
        missingMandatoryFields.push('status')
    }
    if (!file.type) {
        missingMandatoryFields.push('type')
    }
    return missingMandatoryFields
}

export const mapIFileFieldsToMessage= (key: keyof IFile) => {
    switch (key) {
        case 'mandatoryInput':
            return 'Mandatory Input'
        case 'status':
            return 'Status'
        case 'type':
            return 'Type'
        case 'numericInput1':
            return 'Numeric Input 1'
        case 'textInput1':
            return 'Text Input 1'
        case 'textInput2':
            return 'Text Input 2'
        case 'textInput3':
            return 'Text Input 3'
        case 'numericInput2':
            return 'Numeric Input 2'
        case 'dateInput':
            return 'Date Input'
        default:
            return ''
    }
}

    