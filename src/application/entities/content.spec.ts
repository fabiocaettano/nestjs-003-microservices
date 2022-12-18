import { Content } from "./content";

describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('você recebeu uma solicitação de amizade');      
        expect(content).toBeTruthy();
    });
    
    it('should not be able to create a notification conten with less than 5 character', () =>{    
        expect(() => new Content('aaa')).toThrow();
    });
    
    it('should not be able to create a notification conten with more than 240 character', () =>{    
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});