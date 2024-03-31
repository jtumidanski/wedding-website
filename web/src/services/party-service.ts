export interface PartyResponse {
  data: Party[];
}

export interface Party {
  type: string;
  id: string;
  attributes: PartyAttributes;
}

export interface PartyAttributes {
  name: string;
  hash: string;
  members: Member[];
}

export interface Member {
  id: string;
  'first-name': string;
  'last-name': string;
  response: Response;
}

export interface Response {
  id: string;
  attending: boolean;
  entree: string;
  allergies: string[];
}

export async function GetParty(hash: string): Promise<PartyResponse> {
  const url = `http://127.0.0.1/api/rsvp/parties?hash=${hash}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching RSVP data:', error);
    return {data: []};
  }
}
