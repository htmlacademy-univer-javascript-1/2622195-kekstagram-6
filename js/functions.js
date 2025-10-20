export function validateLength(string, maxLength) {
  return string.length <= maxLength;
}

export function isPalindrome(palindrome) {
  const reverseString = (string) => string.split('').reverse().join('');

  const formatted = palindrome
    .replaceAll(' ', '')
    .toLowerCase();

  return formatted === reverseString(formatted);
}

export function extractNumbers(input) {
  const string = String(input);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const potentialNumber = parseInt(string.at(i), 10);

    if (Number.isInteger(potentialNumber)) {
      result += potentialNumber;
    }
  }

  return parseInt(result, 10);
}

export function isMeetingWithinWorkday(startWork, endWork, startMeeting, duration) {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStart = toMinutes(startWork);
  const workEnd = toMinutes(endWork);
  const meetingStart = toMinutes(startMeeting);
  const meetingEnd = meetingStart + duration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
}
