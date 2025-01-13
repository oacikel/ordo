////import analytics from '@react-native-firebase/analytics'
import { useCallback } from 'react'

export const EVENT_NAMES = {
    SCREEN_VIEW: 'screen_view',
    BUTTON_CLICK: 'button_click',
    FILE_OPENED: 'file_opened',
    FILE_CLOSED: 'file_closed',
    FILE_CREATION_REQUESTED: 'file_creation_requested',
    FILE_CREATION_SUCCESS: 'file_creation_success',
    FILE_CREATION_FAILURE: 'file_creation_failure'
    // Add more event names as needed
};

const useFirebaseAnalytics = () => {
    const logEvent = useCallback(async (eventName: string, params?: { [key: string]: any }) => {
        if (Object.values(EVENT_NAMES).includes(eventName)) {
            // await analytics().logEvent(eventName, params);
        } else {
            console.warn(`Event name ${eventName} is not defined in EVENT_NAMES`);
        }
    }, []);

    return {
        logEvent,
        EVENT_NAMES,
    };
};

export default useFirebaseAnalytics