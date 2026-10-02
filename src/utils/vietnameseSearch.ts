import { University, AdmissionRecord, Major, Career } from '../types';

/**
 * Remove Vietnamese accents/diacritics and convert to clean lowercase search string
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';
  let res = str.toLowerCase();
  res = res.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  res = res.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  res = res.replace(/đ/g, 'd');
  // Normalization for combining diacritical marks
  res = res.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return res.trim().replace(/\s+/g, ' ');
}

/**
 * Checks if search text matches target text (both accented and unaccented)
 */
export function matchQuery(target: string | undefined | null, query: string): boolean {
  if (!target || !query) return false;
  const cleanTarget = removeVietnameseTones(target);
  const cleanQuery = removeVietnameseTones(query);
  return cleanTarget.includes(cleanQuery);
}

/**
 * Matches a University against a search query across officialName, shortName, aliases, institutionCode, and province
 */
export function matchUniversity(uni: University, query: string): boolean {
  if (!query || !query.trim()) return true;
  const cleanQuery = removeVietnameseTones(query);

  // Match institution code directly (e.g. BKA, FTU, NEU)
  if (uni.institutionCode && removeVietnameseTones(uni.institutionCode).includes(cleanQuery)) {
    return true;
  }

  // Match official name
  if (matchQuery(uni.officialName, cleanQuery)) {
    return true;
  }

  // Match short name
  if (matchQuery(uni.shortName, cleanQuery)) {
    return true;
  }

  // Match aliases (e.g. ['HUST', 'Bách khoa Hà Nội', 'Dai hoc Bach khoa Ha Noi'])
  if (uni.aliases && uni.aliases.some((alias) => matchQuery(alias, cleanQuery))) {
    return true;
  }

  // Match province
  if (matchQuery(uni.province, cleanQuery)) {
    return true;
  }

  return false;
}

/**
 * Matches an AdmissionRecord against a search query across major name, major code, university, combinations
 */
export function matchAdmissionRecord(rec: AdmissionRecord, query: string, university?: University): boolean {
  if (!query || !query.trim()) return true;
  const cleanQuery = removeVietnameseTones(query);

  if (matchQuery(rec.majorName, cleanQuery)) return true;
  if (rec.majorCode && rec.majorCode.includes(cleanQuery)) return true;
  if (matchQuery(rec.universityName, cleanQuery)) return true;
  if (rec.subjectCombination && matchQuery(rec.subjectCombination, cleanQuery)) return true;
  if (rec.subjectCombinations && rec.subjectCombinations.some((c) => matchQuery(c, cleanQuery))) return true;

  if (university && matchUniversity(university, query)) {
    return true;
  }

  return false;
}
