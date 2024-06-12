import { HandleSubmitFunction, Reset, ColorsType } from "../../interface"
import ErrorMessage from "./error/error_message"
import ImageInputForm from "./image_input_form"
import SuccessMessage from "./success/success_message"


const AppContent = ({isError, isShowingColor, handleSubmit, colors, reset}:{isError: boolean, isShowingColor: boolean, handleSubmit: HandleSubmitFunction, colors: ColorsType, reset: Reset})=>{
    return <>{isError ? <ErrorMessage reset={reset}/> : <>{!isShowingColor ? <ImageInputForm handleSubmit={handleSubmit}/> : <SuccessMessage colors={colors} reset={reset} />
}</>}</>
}

export default AppContent