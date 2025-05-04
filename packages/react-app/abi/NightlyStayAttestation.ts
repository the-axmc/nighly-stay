export const NightlyStayAttestationABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'attester',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'subject',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'metadataHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'context',
        type: 'string',
      },
    ],
    name: 'Attestation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'guest',
        type: 'address',
      },
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'metadataHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'StayRecorded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DECIMALS',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'guest', type: 'address' }],
    name: 'getLatestStay',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'guest', type: 'address' },
          { internalType: 'bytes32', name: 'metadataHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          {
            internalType: 'enum NightlyStayAttestation.Status',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct NightlyStayAttestation.Stay',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'guest', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'getStay',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'guest', type: 'address' },
          { internalType: 'bytes32', name: 'metadataHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          {
            internalType: 'enum NightlyStayAttestation.Status',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct NightlyStayAttestation.Stay',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'guest', type: 'address' }],
    name: 'getStayCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'metadataHash', type: 'bytes32' },
    ],
    name: 'recordStay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'stays',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'address', name: 'guest', type: 'address' },
      { internalType: 'bytes32', name: 'metadataHash', type: 'bytes32' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      {
        internalType: 'enum NightlyStayAttestation.Status',
        name: 'status',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
