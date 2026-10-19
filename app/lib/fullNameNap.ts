/**
 * GCC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "GCC01",
  "fullName": "Gas City Cannabis Dispensary Weed Delivery",
  "street": "985 O'Connor Dr",
  "city": "Toronto",
  "region": "ON",
  "postal": "M4B 2T1",
  "phoneDisplay": "(437) 466-0318",
  "phoneTel": "tel:+14374660318",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJXS-WHh_N1IkR7ZP8wWjQBTk",
  "placeId": "ChIJXS-WHh_N1IkR7ZP8wWjQBTk",
  "neighbourhood": "O'Connor / East York",
  "intersection": "",
  "transit": "Easily accessible via local TTC bus routes serving O'Connor Drive.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
