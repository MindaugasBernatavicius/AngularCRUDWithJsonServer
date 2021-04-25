import { ConvertToSpacePipe } from './convert-to-space.pipe';

describe('ConvertToSpacePipe', () => {

  it('Create a pipe instance', () => {
    // given / when
    const pipe = new ConvertToSpacePipe();

    // then
    expect(pipe).toBeTruthy();
  });

  it('Given a string with single dash, return same string with space in place of the dash', () => {
    // given
    let input = 'Shirt-XXL';
    let charToReplace = '-';
    const pipe = new ConvertToSpacePipe();

    // when
    let res = pipe.transform(input, charToReplace);

    // then
    expect(res).toBe('Shirt XXL');
  });

  it('Given a string with two subsequent dashes, return same string without with the last dash remaining', () => {
    // given
    let input = 'Shirt--XXL';
    let charToReplace = '-';
    const pipe = new ConvertToSpacePipe();

    // when
    let res = pipe.transform(input, charToReplace);

    // then
    expect(res).toBe('Shirt XXL');
  });

  it('Given empty string it returns empty string, no error thrown', () => {
    // given
    let input = '';
    let charToReplace = '-';
    const pipe = new ConvertToSpacePipe();

    // when
    let res = pipe.transform(input, charToReplace);

    // then
    expect(res).toBe('');
  });

  it('Given a string with unicode character to replace, returns string w/o that character', () => {
    // given
    let input = 'ShirtжXXL';
    let charToReplace = 'ж';
    const pipe = new ConvertToSpacePipe();

    // when
    let res = pipe.transform(input, charToReplace);

    // then
    expect(res).toBe('Shirt XXL');
  });

  it('Given a string with non-continuous two dashes, returns string w/o them', () => {
    // given
    let input = 'Shirt-XXL-black';
    let charToReplace = '-';
    const pipe = new ConvertToSpacePipe();

    // when
    let res = pipe.transform(input, charToReplace);

    // then
    expect(res).toBe('Shirt XXL black');
  });
});
