class SanitizationUtility{
    AZaz09_Sanitize(toSanitize: string) {
        return toSanitize.replace(/[^a-zA-Z0-9_]/g, "")
    }
}
export default new SanitizationUtility() //object export