import { StyleSheet } from 'react-native'
import { COLORS, DIMENSIONS } from './constants'
import { act } from 'react'

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: DIMENSIONS.padding,
        backgroundColor: COLORS.background,
        margin: 0
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: DIMENSIONS.borderRadius,
        backgroundColor: COLORS.white,
        marginBottom: DIMENSIONS.marginBottom,
    },
    filterButton: {
        padding: 8,
        borderRadius: DIMENSIONS.borderRadius,
        backgroundColor: COLORS.secondaryLight,
        marginHorizontal: 4,
        flex: 1,
        
    },
    activeFilterButton: {
        backgroundColor: COLORS.primaryLight,

    },
    filterText: {
        color: COLORS.textLight,
        textAlign: 'center',
    },
    activeFilterText: {
        color: COLORS.text,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: DIMENSIONS.marginBottom,
    },
    fileName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fileType: {
        fontSize: 14,
        color: COLORS.text,
    },
    fileStatus: {
        fontSize: 14,
        color: COLORS.primary,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        borderRadius: DIMENSIONS.borderRadius,
        alignItems: 'center',
        color: COLORS.white,
    },
    actionButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
        marginTop: 20,
    },
    fab: {
        position: "absolute",
        right: DIMENSIONS.padding,
        bottom: DIMENSIONS.padding,
        backgroundColor: COLORS.primary,
        borderRadius: DIMENSIONS.borderRadius,
        color: COLORS.white,
    },
    cardOpen: {
        marginVertical: 8,
        borderRadius: 12,
        elevation: DIMENSIONS.elevation,
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    cardClosed: {
        marginVertical: 8,
        borderRadius: 12,
        elevation: DIMENSIONS.elevation,
        backgroundColor: COLORS.secondaryLight,
        borderColor: COLORS.textLight   ,
        borderWidth: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mandatoryInput: {
        fontWeight: 'bold',
        color: '#333',
        width: 'auto'
    },
    subTitle: {
        fontSize: 24,
        color: COLORS.textLight,
        marginVertical: 4,
    },
    statusChip: {
        marginHorizontal: 8,
        borderRadius: 32,
        paddingHorizontal: 4,
        borderWidth: 2,
    },
    openStatus: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        color: COLORS.white,
    },
    closedStatus: {
        borderColor: COLORS.green,
        backgroundColor: COLORS.transparent,
    },
    openStatusText: {
        color: COLORS.white,
    },
    closedStatusText: {
        color: COLORS.green,
    },
    detailsText: {
        color: COLORS.textLight,
        fontSize: 16,
        marginVertical: 2,
    },
    dividerOpen: {
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.accent,
        marginVertical: 8,
        marginHorizontal: -16,
    },
    dividerClosed: {
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.secondary,
        marginVertical: 8,
        marginHorizontal: -16,
    },
    tabContent: {
        padding: DIMENSIONS.padding,
        backgroundColor: COLORS.white,
        margin: DIMENSIONS.padding,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: DIMENSIONS.borderRadius,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        borderRadius: DIMENSIONS.borderRadiusSmall,
        paddingHorizontal: 8,
        marginBottom: DIMENSIONS.marginBottom,
        backgroundColor: COLORS.white,
    },
    fileTypeButton: {
        flex: 1,
        width: 100,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: DIMENSIONS.borderRadius,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
       },
    fileTypeButtonActive: {
        flex: 1,
        width: 100,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: DIMENSIONS.borderRadius,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default globalStyles