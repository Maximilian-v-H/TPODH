import {AccessTokenDto} from './weather';
import {JwtTokenDto} from './weather';
import {SlimRecordDto} from './weather';
import {StationDto} from './weather';


describe('Weather', () => {
  it('should create an instance', () => {
    expect(new StationDto()).toBeTruthy();
  });
});
describe('Weather', () => {
  it('should create an instance', () => {
    expect(new SlimRecordDto()).toBeTruthy();
  });
});
describe('Weather', () => {
  it('should create an instance', () => {
    expect(new JwtTokenDto()).toBeTruthy();
  });
});
describe('Weather', () => {
  it('should create an instance', () => {
    expect(new AccessTokenDto()).toBeTruthy();
  });
});

