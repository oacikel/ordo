import React from 'react'
import { View } from 'react-native'

interface SeparatorProps {
    isHorizontal?: boolean
}

const Separator: React.FC<SeparatorProps> = ({ isHorizontal = false }) => {
    return (
        <View
            style={{
                flex: 1,
                ...(isHorizontal ? { width: '100%', height: 1 } : { width: 1, height: '100%' }),
                backgroundColor: 'transparent',
            }}
        />
    )
}

export default Separator