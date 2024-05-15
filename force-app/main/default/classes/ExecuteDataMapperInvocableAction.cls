global class ExecuteDataMapperInvocableAction {
    @InvocableMethod(label='ExecuteDataMapper')
    public static List<DataMapperResult> executeDataMapperLogic(List<DataMapperRequest> requests) {
        DataMapperRequest request = requests.get(0);
        omnistudio.DRProcessResult result = omnistudio.DRGlobal.process((Map<String, Object>) JSON.deserializeUntyped(request.transformData), request.DRName);
        return new List<DataMapperResult>{
            new DataMapperResult(JSON.serialize(((List<Map<String, Object>>)result.toJsonList()).get(0)))
                                 };
                                 
    }

    global class DataMapperRequest {

        @InvocableVariable(required=true)
        global String DRName;

        @InvocableVariable(required=true)
        global String transformData;
    }

    global class DataMapperResult {

        @InvocableVariable
        global String result;

        public DataMapperResult(String result) {
            this.result = result;
        }
    }
}