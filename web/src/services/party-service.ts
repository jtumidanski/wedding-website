
const baseUri = window.location.origin + `/api/rsvp/`;
  
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

export async function GetParty(search: string): Promise<PartyResponse> {
  const url = baseUri + `parties?search=${search}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching RSVP data:', error);
    return {data: []};
  }
}
export async function updateAllMemberResponse(members: Member[]): Promise<void> {
  try {
    // Map each member to a Promise representing the PATCH request
    const patchPromises = members.map(async (member) => {
      const memberId = member.id;
      await updateMemberResponse(memberId, member.response);
    });

    // Wait for all PATCH requests to complete
    await Promise.all(patchPromises);
  } catch (error) {
    console.error('Error while patching member responses:', error);
  }
}

export async function updateMemberResponse(memberId: string, input: Response): Promise<void> {

  var ipAddress;

  await fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => ipAddress = data.ip)

  try {
    const url = baseUri + `members/${memberId}/response`;

    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: "response",
          id: input.id,
          attributes: {
            attending: input.attending,
            entree: input.entree,
            allergies: input.allergies,
            ipAddress: ipAddress
          }
        },
      }),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to patch member response (${response.status} ${response.statusText})`);
    }
  } catch (error) {
    console.error('Error while patching member response:', error);
  }
}