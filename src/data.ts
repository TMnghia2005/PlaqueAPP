import { DentalPosition, PatientInfo } from './types';

export const DENTAL_POSITIONS: DentalPosition[] = [
  {
    id: 'A1',
    code: 'A1',
    label: 'Top Left',
    fullTitle: 'A1: Top Left',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMOHUwSdV2kTweFPZryZg37ePHK_oLAV-pY8ys8gKNwH5PWU_bu_JYad7mUXiXSxpyD6eT1AzR0hvMnydTUVhpeTUVqBBycRAY7_IAWtBK0UNTo2OnYjCZzp2aynz_fz4JOjXB0xWhthyjyQzaiipJ_4yxYTho8WAS7fH5rnipxh7ma0aJb7o_AGoEUsCAuvcL5SnULShD-vo_O3fJH-dukpfA4YHdDJxtPA--VXKP4hhXgGlUG-bHSdXU5eTa-Y1k7aBnjK38EJ8o'
  },
  {
    id: 'A2',
    code: 'A2',
    label: 'Top Middle',
    fullTitle: 'A2: Top Middle',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXTIedHHUJ4jj78nfDaKnaKbB3ZqNSn5ikiLP0_Fe7_RbYSAM-an9sAk2Ic9ePlbl6zHF2Y5EV09847XjdcI454IbPDoYIngNbwh086TtPcpHQr6vZ6zko-uQ3f8Lb3z8i6TDpQ55so_u1IO5fMy1PZR63UjJJky0Caicjmb2WjpHEB53HXe1W09Op5iE2KXhAn6VIgWfbcX83ugpa617dRabTFWaOpWi87EoItcqQxM_JIVqgQ3xcM3XJsJvP1V2fpc7lyLt-6LYZ'
  },
  {
    id: 'A3',
    code: 'A3',
    label: 'Top Right',
    fullTitle: 'A3: Top Right',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDln9V2ViIAs6EmW652PiILgxQxCwrFoXN_NsG4CJBG2MBHL02Dxkeey-zNkEkFLJYrR771WHZY8_treUoCkNzvxy7B0hSPR4jZf-9TFU07nS4wxnAKMm7ubROyjnf7WswTUXx2P5Prbdr09I6nK-YkCIui9_9B5N-hBSz3fZiWfHQEtNDPpekvuBPLCZP_NvvmcZgJoNmLo1lwFJjtRCaoUx0IvkDKROYDAojG3JNUSpAxSrlMKwH1Tp_-4W-JP2GjnnxJlEUtpwp7'
  },
  {
    id: 'B1',
    code: 'B1',
    label: 'Central Left',
    fullTitle: 'B1: Central Left',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLtqjUT5t451ltIrSImgfqcOIYnYwPJf-H2Zl89sBzK5U6M_raw1JkR7NDeqwNxRemF3iV7pQcqmw8mTOMK3ibeONV02Vv8qe0S_fyjdTrCUuoZBYjvoBq8C66RqINQpIn41T3IUD2ltFfT_1AK-tk-fdrVCWSQdHhfH9KiRuhHqA36H-djkb9GwyS2S517ZRf2GIteg2wFn_ybK3meU_4JJOnPDsdssmQmLGZ6IxEmgPqMrmzGoio_fP6Dg9TndGNYES33QjcfweX'
  },
  {
    id: 'B2',
    code: 'B2',
    label: 'Central Middle',
    fullTitle: 'B2: Central Middle',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvFWAiaPqpw5DYtZBDXcBbs9gag-j4ddkSpxCL18WxIfP-1SZaMT7pOBdBffzlqxdBNF9kBZSZZpShBd-qDdJcKYzO0vLnroYmaKVoS0Mh-jvzKrr9nP1TBBHn6dZQkQa6-HiyYzAYlIhG4pGDQywMTVc5qjw_0YcZQ8-mn-6ZUbrb-PmGdEeljCidWI8hbm37c26RbDQWcGWhw_vOiwNwU46vLEDzeRcdisDaRO1AcEkbZSahglT7lO8adhAeNYZ96W7NDuMNijOt'
  },
  {
    id: 'B3',
    code: 'B3',
    label: 'Central Right',
    fullTitle: 'B3: Central Right',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABsnQqaTjKun82RH_CfsubauwYw4oMgdH9riejVlTzkrVpxP5CB8eBpu4k-x5Cr0gMPnGNw_PEnBEnxsx-_4O9fq8gBOU7jWp-YP0YFV6fZFzbSmlqtyTpyO88_o-BeEbfn-amImRGbSetKsnPH8VuP-z-iwKYyYylesWxYa4s36jsyHJ9jFPLTwRbESdBo204zEFX1MVIK302UBR6f9jWItiRa3QfX3imySbRkNNCrNS5uhMV1T4WGoi_BBWoQtr7A3w2sH6gZq-t'
  },
  {
    id: 'C1',
    code: 'C1',
    label: 'Bottom Left',
    fullTitle: 'C1: Bottom Left',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9CnzMUlM9ghAFo76eM5D_QvL3m6kkoWBuQc1NaILIC9DxX70YvUKKtBMIXmt4FuCRthNPW3JSKmn9EWGcxl_XOxAPmRbWNE5JIiFAgxtni00yEswnYHNUxZ69rA3SkmXbCwieAXk5pT1Ikkkeb16qcAHXYYkQPFlvZs9_mshV80j7ln3Yym70o9BRb09qFgkxDrDoM7asZgQrVQIRWc-q8k3LVUHraxEqZjaYJRdKeKO_OwPOrde_toJgbh4wYABygWN9GBurII3k'
  },
  {
    id: 'C2',
    code: 'C2',
    label: 'Bottom Middle',
    fullTitle: 'C2: Bottom Middle',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI4fzpqWUJbtK-5nwznJfsPuq9hWl_KOdu3hOM0GjONiyu1t2Uor8WSMMjEKz-MuamBTA8Ly9HpdrPomyl5Eh36r-KOuzPE0Xfabs9sq3OEPjws5JnsEyBwjOPBuN2qkNA7FPWqad7RWkL942rXw3PngdRNRUuEowb7cOR3fDz1en-e5jX1gMQaS0jNXEF_Nf2sw49TiGJZz_EVvynCaDrJ2tf1gWuBe4zUTLpF9vzXEpjHvFDeOfiRMfGe7ON3kdJRV18NKCHQXzX'
  },
  {
    id: 'C3',
    code: 'C3',
    label: 'Bottom Right',
    fullTitle: 'C3: Bottom Right',
    defaultImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLkbFa1WQX6YvJ6AEDYY5W_D7baCdX0jKmtsR3IVNJFaOZr5R6MTsOFCftnr4x48I4BshIdj9soxKs8i6_oWLhAfgd1Lzv9XNQOOhMMP1gGj7zKW5ifqkmQEbTB14dsS5hLejTdpavMYF6MdpO5PGpoY7w7Rymi4KMqCkiyI4keRUw3OZ2qbHpsACVJOGgjN60P7aV3lmpXismtDUEiqXllPsi3VqOCqBa1acZ6CCDI8DmLCVHYkB19uAWqdHUlLgw8Y4LuUo5o6of'
  }
];

export const DEFAULT_PATIENT: PatientInfo = {
  name: 'John Doe',
  id: '8821',
  visitNumber: '449',
  date: '23/11/2025'
};
