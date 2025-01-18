import { useCallback, useMemo } from "react";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useAppDispatch } from "@/hooks/reduxHook/hooks";
import { setBottomSheetSnapShotPositionValue } from "@/redux/actions/globalAction";

export const BottomSheetParentComponent = ({ bottomSheetModalRef, component }: any) => {
  const dispatch = useAppDispatch()
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    dispatch(setBottomSheetSnapShotPositionValue(index))
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={{ padding: 20 }}>
        {
          component
        }
      </BottomSheetView>
    </BottomSheetModal>
  )
}