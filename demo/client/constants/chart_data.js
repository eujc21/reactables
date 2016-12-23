import moment from 'moment'

export const lineData = [
  {
    name: 'Set 1',
    values: [
      {
        count: 12,
        date: moment().toISOString()
      },
      {
        count: 20,
        date: moment().add(1, 'days').toISOString()
      },
      {
        count: 55,
        date: moment().add(2, 'days').toISOString()
      },
      {
        count: 25,
        date: moment().add(3, 'days').toISOString()
      },
      {
        count: 35,
        date: moment().add(4, 'days').toISOString()
      }
    ]
  }
]

export const barData = [
  {
    count: 202,
    year: 2000
  },

  {
    count: 179,
    year: 2002
  },

  {
    count: 154,
    year: 2003
  },

  {
    count: 215,
    year: 2001
  },

  {
    count: 260,
    year: 2010
  }
]

export const sankeyData = {
  nodes: [
    { name: 'Node 0'},
    { name: 'Node 1'},
    { name: 'Node 2'},
    { name: 'Node 3'},
    { name: 'Node 4'},
  ],
  links: [
    {
      source: 0,
      target: 4,
      value: 10
    },
    {
      source: 1,
      target: 4,
      value: 10
    },
    {
      source: 2,
      target: 4,
      value: 10
    },
    {
      source: 3,
      target: 4,
      value: 10
    },
  ]
}