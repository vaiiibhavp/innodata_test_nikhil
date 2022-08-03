<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Technology;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $technologies =  [
            [
              'name' => 'React',
            ],
            [
              'name' => 'Laravel'
            ],
            [
                'name' => 'Node Js'
            ],
          ];

          Technology::insert($technologies);
    }
}
