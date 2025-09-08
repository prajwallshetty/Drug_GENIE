// Test script to verify drug interaction detection
const { checkDrugInteractions } = require('./src/utils/drugInteractions.ts');

async function testInteractions() {
  console.log('🧪 Testing Drug Interaction Detection System\n');
  
  const testCases = [
    {
      name: 'Alcohol + Xanax (CRITICAL)',
      drugs: ['alcohol', 'xanax'],
      expectedSeverity: 'severe'
    },
    {
      name: 'Warfarin + Aspirin (SEVERE)',
      drugs: ['warfarin', 'aspirin'],
      expectedSeverity: 'severe'
    },
    {
      name: 'Prozac + Nardil (SEVERE)',
      drugs: ['prozac', 'nardil'],
      expectedSeverity: 'severe'
    },
    {
      name: 'Vicodin + Xanax (CRITICAL)',
      drugs: ['vicodin', 'xanax'],
      expectedSeverity: 'severe'
    },
    {
      name: 'Grapefruit + Lipitor (MODERATE)',
      drugs: ['grapefruit', 'lipitor'],
      expectedSeverity: 'moderate'
    },
    {
      name: 'Lisinopril + Ibuprofen (MODERATE)',
      drugs: ['lisinopril', 'ibuprofen'],
      expectedSeverity: 'moderate'
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n📋 Testing: ${testCase.name}`);
      console.log(`   Drugs: ${testCase.drugs.join(' + ')}`);
      
      const interactions = await checkDrugInteractions(testCase.drugs);
      
      if (interactions.length === 0) {
        console.log('   ❌ FAILED: No interactions detected');
      } else {
        console.log(`   ✅ SUCCESS: ${interactions.length} interaction(s) found`);
        interactions.forEach((interaction, index) => {
          console.log(`   ${index + 1}. Severity: ${interaction.severity}`);
          console.log(`      Description: ${interaction.description.substring(0, 100)}...`);
          console.log(`      Source: ${interaction.source}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
    }
  }
  
  console.log('\n🏁 Test Complete');
}

testInteractions().catch(console.error);
