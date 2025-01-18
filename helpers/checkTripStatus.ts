import { ColorsEmereldGreen } from '@/constants/Colors'
const preferColorPalette = ColorsEmereldGreen; 

export const checkTripStatus = (startDate: string, endDate?: string) => {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = endDate ? new Date(endDate) : undefined;
    const today = new Date();

    if (parsedStartDate > today) {
        return {
            code:1,
            status: 'Upcoming',
            color: preferColorPalette.light.tint,
        };
    }

    if (parsedStartDate <= today && (!parsedEndDate || parsedEndDate >= today)) {
        return {
            code:2,
            status: 'Live Now',
            color: preferColorPalette.light.primary,
        };
    }

    if (parsedEndDate && parsedEndDate < today) {
        return {
            code:3,
            status: 'Trip Ended',
            color: preferColorPalette.light.textSecondary,
        };
    }

    // // Optional fallback (if no conditions are met, though unlikely)
    // return {
    //     status: 'Unknown',
    //     color: preferColorPalette.light.error || '#FF0000', // Add a fallback color if needed
    // };
};
