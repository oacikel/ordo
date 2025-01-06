import { StyleSheet } from 'react-native'
import { COLORS, DIMENSIONS } from './constants'

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: DIMENSIONS.padding,
        backgroundColor: COLORS.secondary,
    },
    searchInput: {
        height: DIMENSIONS.inputHeight,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: DIMENSIONS.borderRadius,
        paddingHorizontal: 8,
        marginBottom: DIMENSIONS.marginBottom,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: DIMENSIONS.marginBottom,
    },
    fileCard: {
        backgroundColor: COLORS.background,
        padding: 12,
        borderRadius: DIMENSIONS.borderRadius,
        marginBottom: DIMENSIONS.marginBottom,
        elevation: DIMENSIONS.elevation,
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
        marginTop: 38,
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        borderRadius: DIMENSIONS.borderRadius,
        alignItems: 'center',
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
        right: 16,
        bottom: 16,
        backgroundColor: COLORS.primary,
    },
    card: {
        marginVertical: 8,
        borderRadius: 12,
        elevation: DIMENSIONS.elevation,
        backgroundColor: '#f5faff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mandatoryInput: {
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    statusChip: {
        marginHorizontal: 8,
        borderRadius: 16,
        paddingHorizontal: 4,
    },
    openStatus: {
        backgroundColor: '#e0f7fa',
        borderColor: '#00796b',
    },
    closedStatus: {
        backgroundColor: '#ffebee',
        borderColor: '#d32f2f',
    },
    detailsText: {
        color: COLORS.text,
        marginVertical: 2,
    },
    divider: {
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginVertical: 8,
    },
    tabContent: {
        flex: 1,
        padding: DIMENSIONS.padding,
        backgroundColor: COLORS.secondary,
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
        height: DIMENSIONS.inputHeight,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: DIMENSIONS.borderRadius,
        paddingHorizontal: 8,
        marginBottom: DIMENSIONS.marginBottom,
        backgroundColor: COLORS.white,
    }
})

export default globalStyles