// mobile-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('logo-icon')
export class LogoIcon extends LitElement {
  static styles = css`
      /* Styles for the navigation menu component */
  `;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="100" viewBox="0 0 74 100" fill="none">
        <path d="M47.1525 34.7422C47.0933 34.7422 47.0637 34.6387 47.0637 34.4315C47.0637 34.1652 47.0933 33.8397 47.1525 33.4551C47.2413 33.0704 47.33 32.7301 47.4188 32.4342C47.5372 32.1087 47.6407 31.9312 47.7295 31.9016C48.8835 31.3986 50.3482 30.9399 52.1236 30.5257C53.9286 30.0818 55.8519 29.7415 57.8936 29.5048C59.9353 29.2385 61.8883 29.1053 63.7524 29.1053C64.6105 29.1053 65.513 29.1497 66.4599 29.2385C67.4364 29.3273 68.2501 29.4456 68.9011 29.5936C69.5816 29.7415 69.9219 29.9191 69.9219 30.1262C69.9219 30.1558 69.8923 30.1706 69.8331 30.1706C69.1822 30.141 68.472 30.1262 67.7027 30.1262C66.9629 30.0966 66.1936 30.0818 65.3946 30.0818C63.205 30.0818 60.9562 30.3037 58.6482 30.7476C56.3697 31.1618 54.2245 31.7241 52.2124 32.4342C50.2002 33.1148 48.5284 33.8841 47.1969 34.7422H47.1525ZM51.2359 75.8869C50.6441 75.739 50.1115 75.4579 49.638 75.0436C49.1646 74.659 48.9279 74.2595 48.9279 73.8452C48.9279 73.7861 48.9279 73.7269 48.9279 73.6677C48.9575 73.6085 48.9871 73.5493 49.0167 73.4902C49.0167 73.431 49.0314 73.4014 49.061 73.4014H49.0167C48.7799 73.4014 48.5876 73.3422 48.4397 73.2239C47.3448 72.4545 46.5459 71.552 46.0429 70.5164C45.5398 69.4807 45.2883 68.3563 45.2883 67.1431C45.2883 65.6341 45.6138 64.0214 46.2648 62.3052C46.9158 60.6186 47.8035 58.9171 48.9279 57.2009C50.0523 55.4551 51.3247 53.7685 52.745 52.1411C54.1653 50.484 55.6448 48.9454 57.1835 47.525C57.3018 46.4598 57.3906 45.4094 57.4498 44.3737C57.5089 43.3085 57.5385 42.2728 57.5385 41.2668C57.5385 39.521 57.4498 37.8787 57.2722 36.3401C57.0947 34.7718 56.8136 33.3811 56.4289 32.1679C56.4289 32.0199 56.6952 31.946 57.2278 31.946C57.7309 31.946 58.2635 32.0495 58.8257 32.2567C59.4175 32.4638 59.7578 32.8485 59.8465 33.4107C59.9649 34.1504 60.0537 34.9346 60.1129 35.7631C60.172 36.562 60.2016 37.3905 60.2016 38.2486C60.2016 39.373 60.1572 40.5418 60.0685 41.755C60.0093 42.9386 59.9057 44.137 59.7578 45.3502C61.0893 44.3145 62.3765 43.4268 63.6193 42.6871C64.8916 41.9178 66.0604 41.3556 67.1257 41.0005C67.244 40.9709 67.3476 40.9561 67.4364 40.9561C67.5251 40.9265 67.6139 40.9117 67.7027 40.9117C68.0873 40.9117 68.2797 41.0153 68.2797 41.2224C68.2797 41.3112 68.2057 41.4147 68.0577 41.5331C66.6078 42.1545 65.1579 42.9238 63.708 43.8411C62.2877 44.7288 60.9118 45.7201 59.5802 46.8149C59.2252 49.5076 58.7665 52.215 58.2043 54.9373C57.6421 57.63 57.0503 60.1747 56.4289 62.5715C55.8075 64.9979 55.2305 67.1431 54.6979 69.0073C54.3428 70.2797 54.0321 71.3301 53.7658 72.1586C53.5291 73.0167 53.2184 73.7269 52.8337 74.2891C52.4787 74.8809 51.9461 75.4135 51.2359 75.8869ZM49.5937 72.203C51.2803 68.4747 52.8781 64.4653 54.3872 60.1747C54.979 58.4585 55.4968 56.6683 55.9407 54.8042C56.3845 52.9104 56.7248 51.0167 56.9615 49.1229C55.0678 50.9575 53.3664 52.9104 51.8573 54.9817C50.3482 57.0234 49.1646 59.0503 48.3065 61.0624C47.4484 63.0745 47.0193 64.9535 47.0193 66.6993C47.0193 67.7941 47.2265 68.815 47.6407 69.7618C48.055 70.7087 48.706 71.5224 49.5937 72.203Z" fill="white"/>
        <path d="M39.5138 56.5795C39.3066 56.5795 39.1291 56.4315 38.9812 56.1356C38.8332 55.8397 38.7444 55.5734 38.7148 55.3367C38.7148 55.2183 38.7592 54.8928 38.848 54.3602C38.9368 53.8276 39.0255 53.2358 39.1143 52.5848C39.2327 51.9043 39.3362 51.2829 39.425 50.7207C39.5138 50.1585 39.573 49.7886 39.6025 49.611C39.425 49.611 38.996 49.5963 38.3154 49.5667C37.6644 49.5371 36.9543 49.4927 36.1849 49.4335C35.4452 49.3447 34.7942 49.2264 34.232 49.0784C33.6698 48.9305 33.3887 48.7381 33.3887 48.5014C33.3887 48.1759 33.4774 47.9096 33.655 47.7025C33.8325 47.4658 34.0544 47.3474 34.3208 47.3474C35.2676 47.3474 36.2293 47.3326 37.2058 47.303C38.1822 47.2734 39.1439 47.2587 40.0908 47.2587C40.3275 45.8679 40.579 44.4624 40.8453 43.0421C41.1116 41.5922 41.3188 40.1423 41.4667 38.6924C41.7922 38.6924 41.9845 39.0179 42.0437 39.6688C42.1029 40.2902 42.1325 40.8524 42.1325 41.3555C42.1325 42.3319 42.1029 43.3232 42.0437 44.3293C42.0141 45.3057 41.9697 46.2822 41.9106 47.2587C42.4432 47.2587 42.9906 47.2734 43.5528 47.303C44.115 47.303 44.6772 47.303 45.2394 47.303C45.8312 47.303 46.4082 47.2882 46.9704 47.2587C47.5326 47.2291 48.0948 47.1847 48.6571 47.1255V47.3474C48.6571 47.6137 48.3464 47.8652 47.725 48.102C47.1332 48.3091 46.4082 48.5014 45.5501 48.679C44.7216 48.8565 43.9375 49.0045 43.1977 49.1228C42.458 49.2412 41.9697 49.3299 41.733 49.3891C41.7034 49.6258 41.5999 50.1289 41.4223 50.8982C41.2744 51.6675 41.082 52.4961 40.8453 53.3838C40.6382 54.2419 40.4163 54.9964 40.1796 55.6474C39.9428 56.2688 39.7209 56.5795 39.5138 56.5795Z" fill="white"/>
        <path d="M4.24341 63.6367C4.09546 63.6367 4.02148 63.5923 4.02148 63.5035C4.02148 63.4443 4.06587 63.3704 4.15464 63.2816C5.36782 61.9796 6.65498 60.5149 8.01612 58.8875C9.34766 57.2305 10.7088 55.4994 12.0995 53.6945C10.8863 53.3098 9.88028 52.8659 9.08135 52.3629C8.28243 51.8599 7.88296 51.2385 7.88296 50.4988C7.88296 50.1733 8.00132 49.9957 8.23804 49.9661C8.50435 49.907 8.78546 49.8774 9.08135 49.8774C9.85069 49.8774 10.6496 49.9957 11.4781 50.2325C12.3362 50.4692 13.1943 50.7503 14.0525 51.0758C16.538 47.7321 18.8608 44.418 21.0209 41.1336C20.6658 38.2633 20.4143 35.6151 20.2663 33.1887C20.1184 30.7623 20.0444 28.8834 20.0444 27.5518C20.0444 27.1967 20.0444 26.886 20.0444 26.6197C20.0444 26.3534 20.0592 26.1463 20.0888 25.9983C20.1776 25.2882 20.2515 24.7112 20.3107 24.2673C20.3699 23.8235 20.6658 23.6016 21.1984 23.6016C21.4943 23.6016 21.8198 23.6312 22.1749 23.6903C22.5595 23.7495 22.8998 23.8531 23.1957 24.001C23.2253 23.9714 23.2845 23.9566 23.3733 23.9566C23.4029 23.9566 23.4177 23.9714 23.4177 24.001C23.4472 24.001 23.4768 24.001 23.5064 24.001C24.4237 24.4449 25.193 25.1106 25.8144 25.9983C26.4358 26.8564 26.7465 28.0105 26.7465 29.4604C26.7465 30.5848 26.5098 31.9015 26.0364 33.4106C25.5629 34.9197 24.7936 36.6655 23.7283 38.648C23.7283 41.0744 23.8171 43.4564 23.9947 45.794C24.1722 48.1316 24.4385 50.2916 24.7936 52.2742C24.8528 52.6884 24.9267 53.0879 25.0155 53.4725C25.1043 53.8572 25.1782 54.2271 25.2374 54.5822C25.8292 54.523 26.5246 54.4194 27.3235 54.2715C28.152 54.1235 28.9658 53.9164 29.7647 53.6501C30.5636 53.3542 31.2294 52.9991 31.762 52.5848C32.3242 52.1706 32.6053 51.6972 32.6053 51.1645C32.6053 51.0166 32.6497 50.9426 32.7385 50.9426C32.8272 50.9426 32.9308 51.061 33.0492 51.2977C33.1675 51.5048 33.2267 51.7859 33.2267 52.141C33.2267 53.5021 31.3329 54.4638 27.5454 55.026C27.1608 55.0852 26.7761 55.1888 26.3914 55.3367C26.0068 55.4847 25.7257 55.677 25.5481 55.9137C25.9624 57.4524 26.3766 58.6508 26.7909 59.5089C27.2052 60.367 27.6046 61.1363 27.9893 61.8169C27.9893 61.9057 27.9005 61.95 27.723 61.95C27.5159 61.95 27.2347 61.8613 26.8797 61.6837C26.5246 61.5062 26.2287 61.2251 25.992 60.8404C25.7848 60.4262 25.5777 60.0119 25.3706 59.5976C25.1635 59.1538 24.9563 58.6952 24.7492 58.2217C23.9799 57.0973 23.3141 56.328 22.7519 55.9137C22.2193 55.4699 21.879 55.2331 21.731 55.2035C21.7902 55.2035 21.3907 55.174 20.5326 55.1148C19.7041 55.0556 18.6389 54.9372 17.3369 54.7597C16.0646 54.5822 14.7774 54.3454 13.4755 54.0495C11.4042 56.8902 9.56959 59.1982 7.97173 60.9736C6.34429 62.749 5.10152 63.6367 4.24341 63.6367ZM23.7283 36.6063C24.5569 35.038 25.1339 33.6917 25.4594 32.5673C25.8144 31.4429 25.992 30.4664 25.992 29.6379C25.992 28.7502 25.8144 28.0105 25.4594 27.4187C25.1339 26.8269 24.7196 26.3386 24.2166 25.954C24.0982 27.5814 23.9799 29.2976 23.8615 31.1026C23.7727 32.9076 23.7283 34.7422 23.7283 36.6063ZM23.5508 54.4934C23.0478 52.6588 22.6039 50.7355 22.2193 48.7234C21.8346 46.7113 21.5091 44.7139 21.2428 42.7314C20.2071 44.2997 19.1863 45.8236 18.1802 47.3031C17.1742 48.7825 16.1977 50.2029 15.2508 51.564C16.612 52.1262 17.9879 52.7032 19.3786 53.295C20.7989 53.8868 22.1897 54.2863 23.5508 54.4934Z" fill="white"/>
        <path d="M35.7666 97.1549C35.699 96.7491 35.6314 96.2757 35.6314 95.8698C35.6314 93.9084 35.5637 91.9469 35.6314 90.0531C35.6314 89.4443 35.9019 88.768 36.1048 88.1592C36.1725 88.024 36.5783 87.8211 36.6459 87.8887C37.187 88.2269 37.931 88.5651 38.1339 89.0385C38.3368 89.6473 38.0663 90.4589 37.9987 91.1353C37.9987 91.2705 37.8634 91.4734 37.8634 91.6087C38.6074 93.0967 37.9986 94.72 38.2692 96.208C38.4045 97.0873 38.2016 97.9666 38.1339 98.9135C38.1339 99.3193 37.187 100.063 36.6459 99.9957C35.9695 99.928 35.6314 99.5222 35.6314 98.8459C35.6314 98.3048 35.6314 97.696 35.6314 97.1549C35.699 97.1549 35.699 97.1549 35.7666 97.1549Z" fill="white"/>
        <path d="M7.35907 89.3091C7.15616 89.5796 6.95325 89.8502 6.61507 90.256C6.07398 89.9178 5.53288 89.512 4.92415 89.1738C4.51833 88.9032 4.45069 88.7003 4.78887 88.2945C5.53288 87.3476 6.34452 86.4007 7.02089 85.3861C7.35907 84.9127 7.56199 84.3039 7.96781 83.8305C8.64418 82.9512 9.32054 82.1396 9.99691 81.3279C10.3351 80.9221 10.538 80.4486 10.8762 80.0428C11.0791 79.8399 11.5526 79.7046 11.6878 79.8399C12.026 80.0428 12.2966 80.4486 12.5671 80.7868C12.7024 80.9221 12.7024 81.125 12.77 81.3279C11.5526 83.4923 9.92927 85.4538 8.30599 87.6181C8.44126 88.2269 7.90017 88.6327 7.02089 88.7003C7.15616 88.9709 7.2238 89.1738 7.35907 89.3091Z" fill="white"/>
        <path d="M67.353 90.0531C66.8119 89.2415 66.2708 88.4298 65.6621 87.6182C65.4592 87.3476 65.121 87.1447 64.9181 86.8742C64.5799 86.3331 64.377 85.7243 63.9712 85.1832C63.7006 84.7774 63.2948 84.5069 63.0243 84.1687C62.3479 83.2894 61.7392 82.4101 61.1304 81.5309C60.5893 80.7869 60.7923 80.2458 61.6039 79.9752C61.9421 79.8399 62.2803 79.5694 62.4832 79.637C62.9566 79.8399 63.3625 80.2458 63.7006 80.6516C64.3094 81.3956 64.8505 82.2072 65.3916 83.0189C66.4061 84.4392 67.353 85.8596 68.3676 87.28C68.6381 87.6182 69.0439 88.0916 69.0439 88.4298C68.9763 88.9033 68.5029 89.2415 68.1647 89.6473C67.8941 89.7826 67.6912 89.8502 67.353 90.0531Z" fill="white"/>
        <path d="M13.5817 91.2029C13.9875 90.3236 14.3933 89.512 14.7992 88.6327C15.2726 87.6858 15.6108 86.6712 16.1519 85.7243C16.3548 85.3861 16.8959 85.1832 17.3017 84.8451C17.9105 85.6567 17.7075 86.2654 17.3017 86.8742C16.6254 88.0916 16.0166 89.3767 15.4079 90.5942C15.0697 91.3382 14.5963 91.8116 13.5817 91.2029Z" fill="white"/>
        <path d="M59.5748 91.6764C57.7486 89.7826 56.8016 87.4829 55.8547 85.3862C56.2606 85.1833 56.5311 85.048 57.0046 84.8451C57.4104 85.5891 57.8838 86.4007 58.3573 87.2124C58.7631 87.8887 59.1013 88.5651 59.5748 89.2415C59.9806 89.7149 60.1158 91 59.5748 91.6764Z" fill="white"/>
        <path d="M44.2889 88.7004C44.5594 89.3768 44.83 89.9855 45.0329 90.6619C45.3034 91.8794 45.5063 93.1645 45.6416 94.3819C45.7092 94.8554 45.7092 95.3288 45.574 95.8023C45.5063 96.0052 45.1682 96.3434 45.1005 96.3434C44.83 96.2081 44.4241 95.9376 44.4241 95.7347C44.4918 95.1259 44.1536 94.7201 44.086 94.179C44.0183 93.2321 43.6801 92.2852 43.5449 91.2706C43.4096 90.6619 43.342 90.0532 43.4096 89.4444C43.4096 89.1739 43.7478 88.971 43.8831 88.7004C44.0183 88.7004 44.1536 88.7004 44.2889 88.7004Z" fill="white"/>
        <path d="M28.8677 96.8168C28.6648 96.208 28.5295 95.8699 28.3943 95.464C28.3266 95.0582 28.3266 94.6524 28.259 94.1789C28.4619 94.1789 28.5972 94.1789 28.7324 94.1789C28.1913 93.0967 28.5972 92.0822 28.7324 91C28.8001 90.4589 28.8677 89.9855 29.003 89.4444C29.0706 89.2414 29.2735 88.9033 29.4764 88.9033C29.6794 88.9033 29.9499 89.1062 30.0852 89.3091C30.2204 89.512 30.2881 89.7825 30.2881 90.0531C30.2881 90.6618 30.1528 91.2029 30.0852 91.8116C30.0175 92.3527 30.0852 92.9615 29.8823 93.5026C29.6794 94.5171 29.9499 95.8022 28.8677 96.8168Z" fill="white"/>
        <path d="M5.87119 76.7286C6.14173 77.3374 6.20937 77.6079 5.73591 78.0137C4.45081 79.1636 3.36862 80.4487 2.15116 81.7338C1.81298 82.072 1.40716 82.2749 1.00134 82.5454C0.527878 82.072 0.52787 81.7338 0.866055 81.2603C1.88061 79.637 3.36862 78.4196 4.72136 77.1345C4.9919 76.7963 5.533 76.7963 5.87119 76.7286Z" fill="white"/>
        <path d="M73.3727 81.2603C72.6287 82.1396 72.6287 82.1396 71.8847 81.4632C70.9378 80.5163 69.9908 79.5694 69.0439 78.6225C68.6381 78.2167 68.1646 77.9461 67.8265 77.5403C67.6236 77.3374 67.4883 76.8639 67.6236 76.7287C67.8941 76.4581 68.2323 76.0523 68.7057 76.4581C69.5174 77.2021 70.3967 77.8785 71.1407 78.6901C71.8847 79.5018 72.561 80.381 73.3727 81.2603Z" fill="white"/>
        <path d="M35.7666 2.84506C35.699 3.25088 35.6314 3.72434 35.6314 4.13016C35.6314 6.09163 35.5637 8.05309 35.6314 9.94693C35.6314 10.5557 35.9019 11.232 36.1048 11.8408C36.1725 11.976 36.5783 12.1789 36.6459 12.1113C37.187 11.7731 37.931 11.4349 38.1339 10.9615C38.3368 10.3527 38.0663 9.5411 37.9987 8.86474C37.9987 8.72946 37.8634 8.52655 37.8634 8.39128C38.6074 6.90327 37.9986 5.27998 38.2692 3.79198C38.4045 2.9127 38.2016 2.03342 38.1339 1.0865C38.1339 0.680682 37.187 -0.0633223 36.6459 0.00431454C35.9695 0.0719514 35.6314 0.477772 35.6314 1.15414C35.6314 1.69523 35.6314 2.30397 35.6314 2.84506C35.699 2.84506 35.699 2.84506 35.7666 2.84506Z" fill="white"/>
        <path d="M7.35907 10.6909C7.15616 10.4204 6.95325 10.1498 6.61507 9.74402C6.07398 10.0822 5.53288 10.488 4.92415 10.8262C4.51833 11.0968 4.45069 11.2997 4.78887 11.7055C5.53288 12.6524 6.34452 13.5993 7.02089 14.6139C7.35907 15.0873 7.56199 15.6961 7.96781 16.1695C8.64418 17.0488 9.32054 17.8604 9.99691 18.6721C10.3351 19.0779 10.538 19.5514 10.8762 19.9572C11.0791 20.1601 11.5526 20.2954 11.6878 20.1601C12.026 19.9572 12.2966 19.5514 12.5671 19.2132C12.7024 19.0779 12.7024 18.875 12.77 18.6721C11.5526 16.5077 9.92927 14.5462 8.30599 12.3819C8.44126 11.7731 7.90017 11.3673 7.02089 11.2997C7.15616 11.0291 7.2238 10.8262 7.35907 10.6909Z" fill="white"/>
        <path d="M67.353 9.9469C66.8119 10.7585 66.2708 11.5702 65.6621 12.3818C65.4592 12.6524 65.121 12.8553 64.9181 13.1258C64.5799 13.6669 64.377 14.2757 63.9712 14.8168C63.7006 15.2226 63.2948 15.4931 63.0243 15.8313C62.3479 16.7106 61.7392 17.5899 61.1304 18.4691C60.5893 19.2131 60.7923 19.7542 61.6039 20.0248C61.9421 20.1601 62.2803 20.4306 62.4832 20.363C62.9566 20.1601 63.3625 19.7542 63.7006 19.3484C64.3094 18.6044 64.8505 17.7928 65.3916 16.9811C66.4061 15.5608 67.353 14.1404 68.3676 12.72C68.6381 12.3818 69.0439 11.9084 69.0439 11.5702C68.9763 11.0967 68.5029 10.7585 68.1647 10.3527C67.8941 10.2174 67.6912 10.1498 67.353 9.9469Z" fill="white"/>
        <path d="M13.5817 8.79709C13.9875 9.67636 14.3933 10.488 14.7992 11.3673C15.2726 12.3142 15.6108 13.3288 16.1519 14.2757C16.3548 14.6139 16.8959 14.8168 17.3017 15.1549C17.9105 14.3433 17.7075 13.7346 17.3017 13.1258C16.6254 11.9084 16.0166 10.6233 15.4079 9.40582C15.0697 8.66181 14.5963 8.18835 13.5817 8.79709Z" fill="white"/>
        <path d="M59.5748 8.32361C57.7486 10.2174 56.8016 12.5171 55.8547 14.6138C56.2606 14.8167 56.5311 14.952 57.0046 15.1549C57.4104 14.4109 57.8838 13.5993 58.3573 12.7876C58.7631 12.1113 59.1013 11.4349 59.5748 10.7585C59.9806 10.2851 60.1158 8.99998 59.5748 8.32361Z" fill="white"/>
        <path d="M44.2889 11.2997C44.5594 10.6233 44.83 10.0146 45.0329 9.33823C45.3034 8.12077 45.5063 6.83567 45.6416 5.61821C45.7092 5.14475 45.7092 4.67129 45.574 4.19783C45.5063 3.99492 45.1682 3.65674 45.1005 3.65674C44.83 3.79201 44.4241 4.06256 44.4241 4.26547C44.4918 4.8742 44.1536 5.28002 44.086 5.82112C44.0183 6.76803 43.6801 7.71495 43.5449 8.7295C43.4096 9.33823 43.342 9.94696 43.4096 10.5557C43.4096 10.8262 43.7478 11.0292 43.8831 11.2997C44.0183 11.2997 44.1536 11.2997 44.2889 11.2997Z" fill="white"/>
        <path d="M28.8677 3.18323C28.6648 3.79196 28.5295 4.13014 28.3943 4.53596C28.3266 4.94178 28.3266 5.34761 28.259 5.82106C28.4619 5.82106 28.5972 5.82106 28.7324 5.82106C28.1913 6.90325 28.5972 7.9178 28.7324 8.99999C28.8001 9.54109 28.8677 10.0145 29.003 10.5556C29.0706 10.7586 29.2735 11.0967 29.4764 11.0967C29.6794 11.0967 29.9499 10.8938 30.0852 10.6909C30.2204 10.488 30.2881 10.2175 30.2881 9.94691C30.2881 9.33818 30.1528 8.79708 30.0852 8.18835C30.0175 7.64726 30.0852 7.03853 29.8823 6.49743C29.6794 5.48288 29.9499 4.19778 28.8677 3.18323Z" fill="white"/>
        <path d="M5.87119 23.2714C6.14173 22.6626 6.20937 22.3921 5.73591 21.9863C4.45081 20.8364 3.36862 19.5513 2.15116 18.2662C1.81298 17.928 1.40716 17.7251 1.00134 17.4546C0.527878 17.928 0.52787 18.2662 0.866055 18.7397C1.88061 20.363 3.36862 21.5804 4.72136 22.8655C4.9919 23.2037 5.533 23.2037 5.87119 23.2714Z" fill="white"/>
        <path d="M73.3727 18.7397C72.6287 17.8604 72.6287 17.8604 71.8847 18.5368C70.9378 19.4837 69.9908 20.4306 69.0439 21.3775C68.6381 21.7833 68.1646 22.0539 67.8265 22.4597C67.6236 22.6626 67.4883 23.1361 67.6236 23.2713C67.8941 23.5419 68.2323 23.9477 68.7057 23.5419C69.5174 22.7979 70.3967 22.1215 71.1407 21.3099C71.8847 20.4982 72.561 19.619 73.3727 18.7397Z" fill="white"/>
      </svg>
    `;
  }
}
