import { AirbagService, CrashSensor, AirbagIgniter, AirbagResult } from '../../services/airbag.service';
import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';

describe('AirbagService', () => 
{

    let sensorMock : MockProxy<CrashSensor>;
    let igniterMock: MockProxy<AirbagIgniter>;
    let service: AirbagService;
    
    beforeEach(() => {
    sensorMock = mock<CrashSensor>();
    igniterMock = mock<AirbagIgniter>();
    service = new AirbagService(sensorMock, igniterMock);
  });
    it('deploys the airbag when a crash is detected', () => {
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);
        const result = service.deployAirbag();
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).toHaveBeenCalledWith(100,50);
        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });

    });

    it('does not deploy the airbag when no crash is detected', () => {
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);

        const result = service.deployAirbag();
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).not.toHaveBeenCalled();
        expect(result).toEqual({triggered : false});



    });

})